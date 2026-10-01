import { useCallback, useEffect, useMemo, useState } from "react";
import { FiBell, FiSearch, FiPlus, FiCalendar, FiUsers, FiX, FiSend, FiInfo, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import TopBar from "../components/TopBar";
import { createNotification, getNotifications, markNotificationRead } from "../api/notification";
import "../styles/Notification.css";

const categoryIcon = { Event: FiCalendar, Reminder: FiAlertTriangle, Update: FiInfo, General: FiCheckCircle };

function formatNotificationDate(value) {
  if (!value) return "";

  // SQL Server DATETIME is already Malaysia local time
  const localValue = String(value).replace("Z", "");
  const date = new Date(localValue);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function Notification() {
  const [currentUser] = useState(() => {
    try {
        return JSON.parse(
            localStorage.getItem("user") || "null"
        );
    } catch {
        return null;
    }
});

  const userId = Number(currentUser?.userId) || null;
  const rank = String(currentUser?.rank || "").toUpperCase();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", category: "General", audience: "All members" });
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readingId, setReadingId] = useState(null);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      if (!userId) throw new Error("Please log in again to view notifications.");
      const data = await getNotifications(userId);
      if (!Array.isArray(data)) throw new Error("Unexpected response while loading notifications.");
      setNotifications(data.map((item, index) => ({
        ...item,
        notificationId: Number(item.notificationId ?? item.NotificationId ?? item.id),
        category: item.category || "General",
        audience: item.audience || "All members",
        date: formatNotificationDate(item.created_at),
        unread: Boolean(item.unread),
      })));
    } catch (error) {
      setLoadError(error.message || "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { loadNotifications(); }, [loadNotifications]);

  const visibleNotifications = useMemo(() => notifications.filter((item) => {
    const matchesFilter = filter === "All" || (filter === "Unread" && item.unread);
    const searchText = `${item.title} ${item.message} ${item.category}`.toLowerCase();
    return matchesFilter && searchText.includes(query.toLowerCase());
  }), [notifications, filter, query]);

  const publish = async (event) => {
    event.preventDefault();
    const title = form.title.trim();
    const message = form.message.trim();
    if (!title || !message) return;
    setFormError("");
    setIsSubmitting(true);
    try {
      await createNotification({ userId, title, message, category: form.category, audience: form.audience });
      setForm({ title: "", message: "", category: "General", audience: "All members" });
      setComposerOpen(false);
      setFilter("All");
      setNotice("Notification published");
      await loadNotifications();
      window.setTimeout(() => setNotice(""), 2600);
    } catch (error) {
      setFormError(error.message || "Failed to publish notification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const markRead = async (notificationId) => {
    setReadingId(notificationId);
    try {
      await markNotificationRead({ userId, notificationId });
      setNotifications((current) => current.map((item) => item.notificationId === notificationId ? { ...item, unread: false } : item));
    } catch (error) {
      setNotice(error.message || "Failed to mark notification as read.");
      window.setTimeout(() => setNotice(""), 2600);
    } finally {
      setReadingId(null);
    }
  };

  const unreadCount = notifications.filter((item) => item.unread).length;

  
  return (
    <div className="notification-page">
        <TopBar />

        <main className="notification-content">
            <header className="notification-heading">
                <div>
                    <span className="notification-eyebrow">
                        STAY IN THE LOOP
                    </span>

                    <h1>Notifications</h1>

                    <p>
                        Announcements and updates for your unit,
                        all in one place.
                    </p>
                </div>

                {rank !== "PTE" && (
                    <button
                        className="notification-compose-btn"
                        onClick={() => setComposerOpen(true)}
                    >
                        <FiPlus />
                        Create notification
                    </button>
                )}
            </header>

        <section className="notification-summary" aria-label="Notification summary">
          <div className="notification-summary-icon"><FiBell /></div>
          <div><strong>{unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}</strong><span>Latest updates from your unit.</span></div>
          <span className="notification-summary-count">{unreadCount}</span>
        </section>

        <section className="notification-list-panel">
          <div className="notification-toolbar">
            <div className="notification-tabs" role="tablist" aria-label="Filter notifications">
              {["All", "Unread"].map((item) => <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}{item === "Unread" && <span>{unreadCount}</span>}</button>)}
            </div>
            <label className="notification-search"><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notifications" aria-label="Search notifications" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><FiX /></button>}</label>
          </div>

          <div className="notification-list">
              {loading ? <div className="notification-state">Loading notifications…</div> : loadError ? <div className="notification-state notification-state-error">{loadError}</div> : visibleNotifications.map((item) => {
              const Icon = categoryIcon[item.category] || FiInfo;
              return <article key={item.notificationId} className={`notification-item ${item.unread ? "is-unread" : ""}`}>
                <div className={`notification-type-icon type-${item.category.toLowerCase()}`}><Icon /></div>
                <div className="notification-item-body">
                  <div className="notification-item-meta"><span className={`notification-category category-${String(item.category).toLowerCase()}`}>{item.category}</span><span className="notification-date">{item.date}</span></div>
                  <h2>{item.title}</h2><p>{item.message}</p>
                  <div className="notification-audience"><FiUsers /> {item.audience}</div>
                </div>
                {item.unread && <button className="mark-read-btn" disabled={readingId === item.notificationId} onClick={() => markRead(item.notificationId)}>{readingId === item.notificationId ? "Saving…" : "Mark as read"}</button>}
              </article>;
            })}
            {!loading && !loadError && visibleNotifications.length === 0 && <div className="notification-empty"><div className="notification-empty-icon"><FiBell /></div><h2>No notifications found</h2><p>Try another filter or search term.</p></div>}
          </div>
        </section>
      </main>

      {notice && <div className="notification-toast" role="status"><FiCheckCircle /> {notice}</div>}
      {composerOpen && <div className="notification-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setComposerOpen(false); }}>
        <section className="notification-composer" role="dialog" aria-modal="true" aria-labelledby="composer-title">
          <header><div><span className="notification-eyebrow">SHARE AN UPDATE</span><h2 id="composer-title">Create notification</h2></div><button className="composer-close" onClick={() => setComposerOpen(false)} aria-label="Close"><FiX /></button></header>
          <form onSubmit={publish}>
            <label>Title<input maxLength="90" required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Saturday training reminder" /></label>
            <label>Message<textarea required rows="5" maxLength="600" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Write the details members need to know..." /></label>
            <div className="composer-fields"><label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}><option>General</option><option>Event</option><option>Reminder</option><option>Update</option></select></label><label>Audience<select value={form.audience} onChange={(event) => setForm({ ...form, audience: event.target.value })}><option>All members</option><option>Officers</option><option>NCOs</option></select></label></div>
            {formError && <p className="composer-error" role="alert">{formError}</p>}
            <div className="composer-actions"><button type="button" className="composer-cancel" onClick={() => setComposerOpen(false)}>Cancel</button><button type="submit" className="notification-compose-btn" disabled={isSubmitting || !userId}><FiSend /> {isSubmitting ? "Publishing…" : "Publish notification"}</button></div>
          </form>
        </section>
      </div>}
    </div>
  );
}

export default Notification;
 Notification
