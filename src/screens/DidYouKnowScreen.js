import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants/config';
import Card from '../components/Card';
import TinuBottomSheet from '../components/TinuBottomSheet';
import { fetchP13nAnswers, activateTinu } from '../services/api';

/**
 * Did You Know Screen
 * Displays educational content cards fetched from the API
 */
const DidYouKnowScreen = ({ navigation }) => {
  const [dykCards, setDykCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tinuData, setTinuData] = useState(null);
  const [tinuLoading, setTinuLoading] = useState(false);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchP13nAnswers();
      if (data.dyk_cards) {
        setDykCards(data.dyk_cards);
      }
    } catch (error) {
      console.error('Error loading DYK cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardPress = async (card) => {
    try {
      setTinuLoading(true);
      bottomSheetRef.current?.expand();
      
      // Fetch Tinu data based on card topic
      const tinuResponse = await activateTinu('dyk', card.topic || 'general');
      setTinuData(tinuResponse);
    } catch (error) {
      console.error('Error loading Tinu data:', error);
    } finally {
      setTinuLoading(false);
    }
  };

  const renderCard = ({ item, index }) => (
    <Card
      title={item.title}
      content={item.content || item.text || 'One study found that kids were twice as likely to become picky eaters when they ate with distractions'}
      onPress={() => handleCardPress(item)}
      type="dyk"
      source={item.source || 'Journal of Applied Developmental Psychology'}
      badges={item.badges || [
        { icon: '🍽️', text: 'Eating with distractions' },
        { icon: '🥗', text: 'Higher rates of healthy food refusal' }
      ]}
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading content...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>UNLEARN OLD PATTERNS</Text>
        <Text style={styles.subtitle}>with science-backed strategies</Text>
      </View>

      <FlatList
        data={dykCards}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('FlashCard')}
        >
          <Text style={styles.navButtonText}>Flash Cards →</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: COLORS.secondary }]}
          onPress={() => {
            handleCardPress(dykCards[0] || {});
          }}
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
  listContent: {
    paddingVertical: 16,
    paddingBottom: 40,
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
  navButtonActive: {
    backgroundColor: COLORS.secondary,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  navButtonTextActive: {
    color: COLORS.white,
  },
});

export default DidYouKnowScreen;

