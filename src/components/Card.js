import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { COLORS } from '../constants/config';

const { width } = Dimensions.get('window');

/**
 * Reusable Card Component
 * Used for displaying content cards in both DYK and Flash Card screens
 */
const Card = ({ 
  title, 
  content, 
  onPress, 
  style, 
  type = 'dyk', // 'dyk' or 'flashcard'
  source,
  badge,
  badges = [], // Array of badge objects for DYK cards
}) => {
  const isDYK = type === 'dyk';
  const bgColor = isDYK ? COLORS.dykCardBg : COLORS.flashCardBg;
  
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Illustration placeholder with overlay */}
      <View style={styles.imageContainer}>
        <View style={[styles.imagePlaceholder, { backgroundColor: isDYK ? '#E8C4D4' : '#8BADC4' }]}>
          <Text style={styles.imagePlaceholderText}>
            {isDYK ? '👧🏽🍽️' : '🧒🏽📱'}
          </Text>
        </View>
        
        {/* DID YOU KNOW badge with lightbulb */}
        {isDYK && (
          <View style={styles.didYouKnowBadge}>
            <Text style={styles.lightbulbIcon}>💡</Text>
            <Text style={styles.didYouKnowText}>DID YOU{'\n'}KNOW ?</Text>
          </View>
        )}
      </View>
      
      {/* Content section with colored background */}
      <View style={[styles.cardContent, { backgroundColor: bgColor }]}>
        {/* Two badges for DYK cards */}
        {isDYK && badges.length > 0 && (
          <View style={styles.badgesRow}>
            {badges.map((badgeItem, index) => (
              <View key={index} style={styles.badgeContainer}>
                {badgeItem.icon && <Text style={styles.badgeIcon}>{badgeItem.icon}</Text>}
                <Text style={styles.badgeText}>{badgeItem.text}</Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Content */}
        <Text style={[styles.content, !isDYK && styles.flashCardContent]}>
          {content}
        </Text>
        
        {/* Source citation for DYK cards */}
        {isDYK && source && (
          <Text style={styles.source}>{source}</Text>
        )}
        
        {/* Tinu avatar at bottom */}
        <View style={styles.tinuAvatar}>
          <Text style={styles.tinuEmoji}>🤓</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    marginHorizontal: 20,
    marginVertical: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 64,
  },
  didYouKnowBadge: {
    position: 'absolute',
    left: 20,
    bottom: -30,
    backgroundColor: COLORS.dykCardBg,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  lightbulbIcon: {
    fontSize: 24,
    marginBottom: 2,
  },
  didYouKnowText: {
    fontSize: 8,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 10,
  },
  cardContent: {
    padding: 20,
    paddingTop: 40,
    minHeight: 240,
    position: 'relative',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  badgeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  badgeIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.white,
    lineHeight: 22,
  },
  flashCardContent: {
    fontSize: 15,
    lineHeight: 22,
  },
  source: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.white,
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  tinuAvatar: {
    position: 'absolute',
    bottom: -25,
    left: '50%',
    marginLeft: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  tinuEmoji: {
    fontSize: 28,
  },
});

export default Card;

