import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/config';

/**
 * Chip Component
 * Used for displaying selectable options in the Tinu bottom sheet
 */
const Chip = ({ label, selected, onPress, icon, variant = 'default' }) => {
  // Different chip colors based on variant
  const getChipColor = () => {
    if (selected) return COLORS.chipSelected;
    
    switch (variant) {
      case 'blue':
        return COLORS.chipBlue;
      case 'pink':
        return COLORS.chipPink;
      case 'peach':
        return COLORS.chipPeach;
      default:
        return COLORS.chipBackground;
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        { backgroundColor: getChipColor() },
        selected && styles.chipSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  chipSelected: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  chipTextSelected: {
    color: COLORS.white,
  },
});

export default Chip;

