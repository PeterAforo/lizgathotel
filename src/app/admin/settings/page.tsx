"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PageHeader from "@/components/admin/PageHeader";
import FormField from "@/components/admin/FormField";

interface Setting {
  id: string;
  key: string;
  value: string;
  description: string | null;
}

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const fetchSettings = () => {
    setLoading(true);
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        const values: Record<string, string> = {};
        data.forEach((s: Setting) => { values[s.key] = s.value; });
        setFormValues(values);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };
  useEffect(() => { fetchSettings(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const pairs = settings.map((s) => ({ key: s.key, value: formValues[s.key] || "" }));
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pairs),
      });
      if (!res.ok) throw new Error();
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Group settings by prefix
  const groups: Record<string, Setting[]> = {};
  settings.forEach((s) => {
    const prefix = s.key.split("_")[0] || "general";
    if (!groups[prefix]) groups[prefix] = [];
    groups[prefix].push(s);
  });

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage site-wide configuration" />

      <form onSubmit={handleSave} className="space-y-6">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group} className="rounded-sm border border-cream-dark bg-white p-6">
            <h2 className="mb-4 font-sans text-lg font-bold capitalize text-dark">{group} Settings</h2>
            <div className="space-y-4">
              {items.map((s) => (
                <div key={s.key}>
                  <FormField
                    label={s.key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    name={s.key}
                    value={formValues[s.key] || ""}
                    onChange={handleChange}
                    rows={s.value.length > 100 ? 3 : undefined}
                  />
                  {s.description && (
                    <p className="mt-0.5 font-body text-xs text-gray">{s.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-sm bg-primary px-8 py-2.5 font-body text-sm font-semibold text-dark transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
