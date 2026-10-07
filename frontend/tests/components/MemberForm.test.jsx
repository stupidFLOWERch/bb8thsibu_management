import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MemberForm from "../../src/components/MemberForm";

describe("MemberForm", () => {

    const mockFormData = {
        First_name: "John",
        Last_name: "Smith",
        Email: "john@test.com",
        Telephone: "0123456789",
        Squad_id: 1,
        Ranks: "Pte",
    };

    const mockMember = {
        Role: "Boys",
        First_name: "John",
    };

    it("shows Select a member when no member is selected", () => {
        render(
            <MemberForm
                formData={mockFormData}
                selectedMember={null}
                onChange={vi.fn()}
                onSave={vi.fn()}
                submitting={false}
                memberType="member"
            />
        );

        expect(
            screen.getByRole("heading", {
                name: "Select a member",
            })
        ).toBeInTheDocument();
    });

    it("shows Select an officer when no officer is selected", () => {
        render(
            <MemberForm
                formData={mockFormData}
                selectedMember={null}
                onChange={vi.fn()}
                onSave={vi.fn()}
                submitting={false}
                memberType="officer"
            />
        );

        expect(
            screen.getByRole("heading", {
                name: "Select an officer",
            })
        ).toBeInTheDocument();
    });

    it("shows the editing member title when a Boys member is selected", () => {
        render(
            <MemberForm
                formData={mockFormData}
                selectedMember={mockMember}
                onChange={vi.fn()}
                onSave={vi.fn()}
                submitting={false}
                memberType="member"
            />
        );

        expect(
            screen.getByRole("heading", {
                name: "Editing Member: John",
            })
        ).toBeInTheDocument();
    });

    it("shows the editing officer title when an officer is selected", () => {
        render(
            <MemberForm
                formData={mockFormData}
                selectedMember={{
                    Role: "Officers",
                    First_name: "David",
                }}
                onChange={vi.fn()}
                onSave={vi.fn()}
                submitting={false}
                memberType="officer"
            />
        );

        expect(
            screen.getByRole("heading", {
                name: "Editing Officer: David",
            })
        ).toBeInTheDocument();
    });

    it("disables the form fields when no member is selected", () => {
        render(
            <MemberForm
                formData={mockFormData}
                selectedMember={null}
                onChange={vi.fn()}
                onSave={vi.fn()}
                submitting={false}
                memberType="member"
            />
        );

        expect(
            screen.getByRole("textbox", {
                name: "First Name",
            })
        ).toBeDisabled();

        expect(
            screen.getByRole("textbox", {
                name: "Last Name",
            })
        ).toBeDisabled();

        expect(
            screen.getByRole("textbox", {
                name: "Email",
            })
        ).toBeDisabled();

        expect(
            screen.getByRole("textbox", {
                name: "Telephone",
            })
        ).toBeDisabled();

        expect(
            screen.getByRole("spinbutton", {
                name: "Squad",
            })
        ).toBeDisabled();

        expect(
            screen.getByRole("combobox", {
                name: "Rank",
            })
        ).toBeDisabled();
    });

    it("enables the form fields when a member is selected", () => {
        render(
            <MemberForm
                formData={mockFormData}
                selectedMember={mockMember}
                onChange={vi.fn()}
                onSave={vi.fn()}
                submitting={false}
                memberType="member"
            />
        );

        expect(
            screen.getByRole("textbox", {
                name: "First Name",
            })
        ).not.toBeDisabled();

        expect(
            screen.getByRole("textbox", {
                name: "Last Name",
            })
        ).not.toBeDisabled();

        expect(
            screen.getByRole("combobox", {
                name: "Rank",
            })
        ).not.toBeDisabled();
    });

    it("shows Boys rank options for a Boys member", () => {
        render(
            <MemberForm
                formData={mockFormData}
                selectedMember={mockMember}
                onChange={vi.fn()}
                onSave={vi.fn()}
                submitting={false}
                memberType="member"
            />
        );

        expect(
            screen.getByRole("option", { name: "Pte" })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "Lcpl" })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "Cpl" })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "Sgt" })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "Ssgt" })
        ).toBeInTheDocument();
    });

    it("shows Officer rank options for an officer", () => {
        render(
            <MemberForm
                formData={{
                    ...mockFormData,
                    Ranks: "Capt.",
                }}
                selectedMember={{
                    Role: "Officers",
                    First_name: "David",
                }}
                onChange={vi.fn()}
                onSave={vi.fn()}
                submitting={false}
                memberType="officer"
            />
        );

        expect(
            screen.getByRole("option", { name: "Helper" })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "W/O" })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "Lt." })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "Capt." })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "H/Capt." })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("option", { name: "Chap." })
        ).toBeInTheDocument();
    });

    it("calls onChange when the first name is changed", () => {
        const onChange = vi.fn();

        render(
            <MemberForm
                formData={mockFormData}
                selectedMember={mockMember}
                onChange={onChange}
                onSave={vi.fn()}
                submitting={false}
                memberType="member"
            />
        );

        fireEvent.change(
            screen.getByRole("textbox", {
                name: "First Name",
            }),
            {
                target: {
                    value: "Peter",
                },
            }
        );

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("calls onSave when Save Changes is clicked", () => {
        const onSave = vi.fn();

        render(
            <MemberForm
                formData={mockFormData}
                selectedMember={mockMember}
                onChange={vi.fn()}
                onSave={onSave}
                submitting={false}
                memberType="member"
            />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Save Changes",
            })
        );

        expect(onSave).toHaveBeenCalledTimes(1);
    });
});