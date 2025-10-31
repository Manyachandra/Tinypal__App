import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants/config';
import TinuBottomSheet from '../components/TinuBottomSheet';
import { fetchP13nAnswers, activateTinu } from '../services/api';

/**
 * Flash Card Screen
 * Displays flashcards that can be flipped to reveal answers
 */
const FlashCardScreen = ({ navigation }) => {
  const [flashCards, setFlashCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tinuData, setTinuData] = useState(null);
  const [tinuLoading, setTinuLoading] = useState(false);
  const bottomSheetRef = useRef(null);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchP13nAnswers();
      if (data.flash_cards) {
        setFlashCards(data.flash_cards);
      }
    } catch (error) {
      console.error('Error loading flash cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnimation, {
        toValue: 180,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentIndex < flashCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      flipAnimation.setValue(0);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      flipAnimation.setValue(0);
    }
  };

  const handleTinuPress = async () => {
    try {
      setTinuLoading(true);
      bottomSheetRef.current?.expand();
      
      const currentCard = flashCards[currentIndex];
      const tinuResponse = await activateTinu(
        'flash_card',
        currentCard.topic || 'nutrition_impacts_mood'
      );
      setTinuData(tinuResponse);
    } catch (error) {
      console.error('Error loading Tinu data:', error);
    } finally {
      setTinuLoading(false);
    }
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnimation.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [1, 0, 0],
  });

  const backOpacity = flipAnimation.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [0, 0, 1],
  });
  
  const currentCard = flashCards[currentIndex];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.secondary} />
          <Text style={styles.loadingText}>Loading flash cards...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (flashCards.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No flash cards available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('DidYouKnow')} style={{ marginBottom: 12 }}>
          <Text style={{ color: COLORS.white, fontSize: 16 }}>← Back to Did You Know</Text>
        </TouchableOpacity>
        <Text style={styles.title}>UNLEARN OLD PATTERNS</Text>
        <Text style={styles.subtitle}>
          with science-backed strategies
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={flipCard}
          style={styles.cardTouchable}
        >
          {/* Front of card */}
          <Animated.View
            style={[
              styles.card,
              styles.cardFront,
              {
                transform: [{ rotateY: frontInterpolate }],
                opacity: frontOpacity,
              },
            ]}
          >
            {/* Illustration section */}
            <View style={styles.illustrationSection}>
              <View style={styles.illustrationPlaceholder}>
                <Text style={styles.illustrationEmoji}>🧒🏽📱</Text>
              </View>
              {/* Counter badge integrated in illustration */}
              <View style={styles.counterBadge}>
                <Text style={styles.counterText}>{currentIndex + 1}</Text>
              </View>
            </View>
            
            {/* Content section */}
            <View style={styles.cardContentSection}>
              <Text style={styles.cardTitle}>
                {currentCard.title || 'What Qualifies as Distractions?'}
              </Text>
              <Text style={styles.cardText}>
                {currentCard.question || currentCard.front || currentCard.text || 'Toys and screens? Obvious distractions. But so are:\n- "Open your mouth! Here comes an aeroplane wooooo!"\n- "Look there\'s a bird!", as the bite goes in <child name>\'s mouth.\n- "I\'m closing my eyes. Let me see who comes to take a bite: you or the cat!"'}
              </Text>
            </View>
          </Animated.View>

          {/* Back of card */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              {
                transform: [{ rotateY: backInterpolate }],
                opacity: backOpacity,
              },
            ]}
          >
            <View style={styles.cardContentSection}>
              <Text style={styles.cardTitle}>Answer</Text>
              <Text style={styles.cardText}>
                {currentCard.answer || currentCard.back || 'Focus on the food and the experience. Let children develop their own relationship with eating without external entertainment or pressure.'}
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
        
        {/* Navigation arrows */}
        <View style={styles.cardNavigation}>
          <TouchableOpacity
            onPress={previousCard}
            disabled={currentIndex === 0}
            style={[styles.navArrow, currentIndex === 0 && { opacity: 0.3 }]}
          >
            <Text style={{ color: COLORS.white, fontSize: 24 }}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={nextCard}
            disabled={currentIndex === flashCards.length - 1}
            style={[styles.navArrow, currentIndex === flashCards.length - 1 && { opacity: 0.3 }]}
          >
            <Text style={{ color: COLORS.white, fontSize: 24 }}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('DidYouKnow')}
        >
          <Text style={styles.navButtonText}>← Did You Know</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: COLORS.secondary }]}
          onPress={handleTinuPress}
        >
          <Text style={styles.navButtonText}>Ask Tinu</Text>
        </TouchableOpacity>
      </View>

      <TinuBottomSheet
        ref={bottomSheetRef}
        data={tinuData}
        loading={tinuLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
    opacity: 0.8,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardTouchable: {
    width: '100%',
    height: 500,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    backgroundColor: COLORS.tertiary,
  },
  cardBack: {
    backgroundColor: COLORS.dykCardBg,
  },
  illustrationSection: {
    height: 240,
    position: 'relative',
  },
  illustrationPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8BADC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationEmoji: {
    fontSize: 80,
  },
  counterBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  counterText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
  },
  cardContentSection: {
    flex: 1,
    padding: 28,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 16,
    textAlign: 'left',
  },
  cardText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.white,
    lineHeight: 24,
    textAlign: 'left',
  },
  cardNavigation: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  navArrow: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.white,
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default FlashCardScreen;

