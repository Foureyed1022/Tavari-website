export const DEPARTMENTS = [
    { id: "strategy", name: "Brand Strategy & Marketing" },
    { id: "design", name: "Creative Design & Content" },
    { id: "production", name: "Audio-Visual Production" },
    { id: "digital", name: "Digital Marketing & Media" },
    { id: "pr", name: "PR & Communications" },
    { id: "events", name: "Events & Activations" },
    { id: "talent", name: "Talent Management" },
    { id: "consultancy", name: "Consultancy & Research" },
    { id: "finance", name: "Finance & Accounts" },
] as const;

export type DepartmentId = typeof DEPARTMENTS[number]['id'];

export const getDepartmentName = (id: string) => {
    return DEPARTMENTS.find(d => d.id === id)?.name || id;
};
