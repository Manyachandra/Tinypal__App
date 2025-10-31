import React, { useCallback, useMemo, forwardRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { COLORS } from '../constants/config';
import Chip from './Chip';

const { height } = Dimensions.get('window');

/**
 * Tinu Bottom Sheet Component
 * Displays AI assistant interface with cards and chip options
 */
const TinuBottomSheet = forwardRef(({ data, loading }, ref) => {
  const [selectedChip, setSelectedChip] = useState(null);
  const [textInput, setTextInput] = useState('');

  // Define snap points for the bottom sheet
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // Utility function to completely remove SVG/HTML/XML tags and content
  const sanitizeText = (text) => {
    if (!text) return '';
    const str = String(text);
    // Remove all XML/HTML/SVG tags including their content
    return str
      .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '') // Remove entire SVG blocks
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove all remaining HTML/XML tags
      .replace(/&[a-z]+;/gi, '') // Remove HTML entities
      .trim();
  };

  // Render backdrop for the bottom sheet
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  // Handle chip selection
  const handleChipPress = (chipId) => {
    setSelectedChip(selectedChip === chipId ? null : chipId);
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <View style={styles.contentContainer}>
        {/* Header with Tinu avatar and background */}
        <View style={styles.headerWithBackground}>
          <View style={styles.headerBackgroundGradient} />
          <View style={styles.header}>
            <View style={styles.tinuAvatarHeader}>
              <Text style={styles.tinuAvatarEmoji}>🤓</Text>
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Tinu</Text>
              <Text style={styles.headerSubtitle}>Your AI Learning Assistant</Text>
            </View>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.tinuButton} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Display cards from API response or placeholder */}
            {data?.cards && data.cards.length > 0 ? (
              <View style={styles.cardsContainer}>
                {data.cards.map((card, index) => (
                  <View key={index} style={styles.tinuCard}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardBadge}>Card</Text>
                      <View style={styles.cardActions}>
                        <TouchableOpacity style={styles.actionButton}>
                          <Text style={styles.actionIconText}>⎙</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                          <Text style={styles.actionIconText}>★</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {card.title && (
                      <Text style={styles.cardTitle}>
                        {sanitizeText(card.title)}
                      </Text>
                    )}
                    <Text style={styles.cardContent}>
                      {sanitizeText(card.content || card.text)}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.cardsContainer}>
                <View style={styles.tinuCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardBadge}>Card</Text>
                    <View style={styles.cardActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIconText}>⎙</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIconText}>★</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.cardTitle}>
                    Aim for natural conversations
                  </Text>
                  <Text style={styles.cardContent}>
                    "Did you know when Geeta Aunty and I were young, there was one thing we both liked", or "How was school today"
                  </Text>
                </View>
                <View style={styles.tinuCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardBadge}>Card</Text>
                    <View style={styles.cardActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIconText}>⎙</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIconText}>★</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.cardTitle}>
                    Talk about activities
                  </Text>
                  <Text style={styles.cardContent}>
                    Look what happens when you eat broccoli! or "Do you want to learn a recipe in cooking!"
                  </Text>
                </View>
              </View>
            )}

            {/* Display chips - Horizontal Scroll */}
            <View style={styles.chipsContainer}>
              <Text style={styles.chipsTitle}>Share more context of Arya</Text>
              <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={styles.chipsScrollView}
              >
                <View style={styles.chipsWrapper}>
                  {(data?.chips && data.chips.length > 0 ? data.chips : [
                    { id: 1, label: "Arya doesn't want to talk about foods", icon: '😤' },
                    { id: 2, label: "Arya doesn't want to sit in one place", icon: '🚗' },
                    { id: 3, label: "Arya is very active", icon: '⚡' },
                    { id: 4, label: "Arya loves playing outside", icon: '🏃' },
                    { id: 5, label: "Arya gets distracted easily", icon: '🎯' },
                  ]).map((chip, index) => {
                    const variants = ['peach', 'blue', 'pink', 'default'];
                    const variant = variants[index % variants.length];
                    
                    // Sanitize chip label and icon to remove any SVG/HTML
                    const cleanLabel = sanitizeText(chip.label || chip.text);
                    const cleanIcon = sanitizeText(chip.icon);
                    
                    return (
                      <Chip
                        key={chip.id || index}
                        label={cleanLabel}
                        selected={selectedChip === chip.id}
                        onPress={() => handleChipPress(chip.id)}
                        variant={variant}
                        icon={cleanIcon || undefined}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            {/* Text input for "Ask Me Anything" */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ask me anything..."
                  placeholderTextColor="#999999"
                  value={textInput}
                  onChangeText={setTextInput}
                  multiline={false}
                  editable={true}
                  autoCorrect={true}
                  autoCapitalize="sentences"
                  returnKeyType="send"
                  underlineColorAndroid="transparent"
                  onSubmitEditing={() => {
                    if (textInput.trim()) {
                      console.log('Send message:', textInput);
                      setTextInput('');
                    }
                  }}
                />
                <TouchableOpacity 
                  style={styles.micButton}
                  onPress={() => console.log('Mic pressed')}
                >
                  <Text style={styles.micIcon}>🎤</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={() => {
                    if (textInput.trim()) {
                      console.log('Send message:', textInput);
                      setTextInput('');
                    }
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.sendIcon}>↑</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: COLORS.tinuBg,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  handleIndicator: {
    backgroundColor: COLORS.textSecondary,
    width: 40,
    height: 4,
    opacity: 0.3,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.tinuBg,
  },
  headerWithBackground: {
    marginBottom: 20,
    position: 'relative',
  },
  headerBackgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#FFE4D6',
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: 'relative',
  },
  tinuAvatarHeader: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  tinuAvatarEmoji: {
    fontSize: 32,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    marginBottom: 16,
  },
  tinuCard: {
    marginHorizontal: 0,
    minHeight: 140,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  cardActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionIcon: {
    fontSize: 14,
  },
  actionIconText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  chipsContainer: {
    marginBottom: 16,
  },
  chipsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  chipsScrollView: {
    flexGrow: 0,
    flexShrink: 1,
  },
  chipsWrapper: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minHeight: 44,
    backgroundColor: 'transparent',
  },
  micButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    fontSize: 18,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.tinuButton,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  sendIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default TinuBottomSheet;

