import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

export type RequirementLevel = "must" | "nice";
export type FilterAttribute =
  | "choose_preference"
  | "wants_kids"
  | "no_kids"
  | "open_to_disability";

  const VISIBILITY_OPTIONS = [
    { key: "profile", icon: "eye.fill", label: "Visible in \n Profile" },
    { key: "match", icon: "person.2.fill", label: "Visible after \n Match" },
    { key: "never", icon: "nosign", label: "Hide \nPreference" },
  ];

export type FilterRule = {
  level: RequirementLevel;
  attribute: FilterAttribute | null;
};

type Attr = { value: FilterAttribute; label: string };

const DEFAULT_ATTRS: Attr[] = [
  { value: "choose_preference", label: "Choose your preference" },
  { value: "no_kids", label: "Wants no kids" },
  { value: "wants_kids", label: "Wants kids" },
  { value: "open_to_disability", label: "Open to dating disabled people" },
];

type Props = {
  value: FilterRule;
  onChange: (next: FilterRule) => void;
  attributes?: Attr[];
  title?: string;
};

export default function FilterField({
  value,
  onChange,
  attributes = DEFAULT_ATTRS,
  title = "Partner preference filter",
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("profile");


  const selectedLabel =
    attributes.find((a) => a.value === value.attribute)?.label ??
    "Select attribute…";

  return (
    <View
      style={styles.wrap}
      accessible
      accessibilityLabel="Filter preferences"
    >
      <Text style={styles.title}>{title}</Text>

      {/* Radio group */}
      <View
        style={styles.radioRow}
        accessibilityRole="radiogroup"
        accessibilityLabel="Preference strength"
      >
        <Radio
          label="Must-have"
          checked={value.level === "must"}
          onPress={() => onChange({ ...value, level: "must" })}
        />
        <Radio
          label="Nice-to-have"
          checked={value.level === "nice"}
          onPress={() => onChange({ ...value, level: "nice" })}
        />
      </View>

      {/* Dropdown */}
      <View style={styles.dropdownWrap}>
        <Pressable
          onPress={() => setOpen((o) => !o)}
          style={styles.dropdownButton}
          accessibilityRole="button"
          accessibilityLabel="Choose attribute to filter on"
          // accessibilityExpanded={open}
          hitSlop={8}
        >
          <Text style={styles.dropdownText}>{selectedLabel}</Text>
          <IconSymbol
            size={16}
            name={open ? "chevron.up" : "chevron.down"}
            color="#111"
          />
        </Pressable>

        {open && (
          <View
            style={styles.menu}
            accessibilityRole="menu"
            accessibilityLabel="Attribute options"
          >
            {attributes.map((attr) => {
              const active = value.attribute === attr.value;
              return (
                <Pressable
                  key={attr.value}
                  onPress={() => {
                    onChange({ ...value, attribute: attr.value });
                    setOpen(false);
                  }}
                  style={[styles.menuItem, active && styles.menuItemActive]}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: active }}
                >
                  <Text
                    style={[
                      styles.menuItemText,
                      active && styles.menuItemTextActive,
                    ]}
                  >
                    {attr.label}
                  </Text>
                  {active ? (
                    <IconSymbol size={14} name="checkmark" color="#111" />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        )}

    <View style={styles.optionsContainer}>
                        {VISIBILITY_OPTIONS.map((opt) => {
                          const isSelected = selectedOption === opt.key;

                          return (
                            <Pressable
                              key={opt.key}
                              onPress={() => setSelectedOption(opt.key)}
                              style={[
                                styles.optionButton,
                                isSelected && styles.optionSelected,
                              ]}
                            >
                              <IconSymbol
                                size={18}
                                name={opt.icon}
                                color={isSelected ? "#ffffff" : "#6B7280"}
                              />
                              <Text
                                style={[
                                  styles.optionText,
                                  isSelected && styles.optionTextSelected,
                                ]}
                              >
                                {opt.label}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>

      </View>
    </View>
  );
}

function Radio({
  label,
  checked,
  onPress,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.radioItem}
      accessibilityRole="radio"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
      hitSlop={8}
    >
      <View style={[styles.radioOuter, checked && styles.radioOuterActive]}>
        {checked && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  radioRow: { flexDirection: "row", gap: 14, marginBottom: 10 },
  radioItem: { flexDirection: "row", alignItems: "center" },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  radioOuterActive: { borderColor: "#ad7aff" },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ad7aff",
  },
  radioLabel: { fontSize: 14, color: "#222" },

  dropdownWrap: { marginTop: 4 },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
  dropdownText: { fontSize: 15, color: "#222" },
  menu: {
    marginTop: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    overflow: "hidden",
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItemActive: { backgroundColor: "#f5f1ff" },
  menuItemText: { fontSize: 15, color: "#222" },
  menuItemTextActive: { fontWeight: "600" },
      optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
        gap: 8,
      },

      optionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "#F3F4F6",
        borderWidth: 1,
        borderColor: "#E5E7EB",
      },

      optionSelected: {
        backgroundColor: "#ad7aff",
        borderColor: "#ad7aff",
      },

      optionText: {
        fontSize: 12,
        color: "#6B7280",
        textAlign: "left"
      },

      optionTextSelected: {
        color: "#ffffff",
        fontWeight: "600",
      },
      optionTextSelected: {
        color: "#ffffff",
        fontWeight: "600",
      },
});
