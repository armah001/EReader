import { Image, StyleSheet, Platform, ScrollView, Dimensions } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

export default function BookScreen() {
    const mangaPages = [
        require('@/assets/images/one-piece-1055-3.jpg'),
        require('@/assets/images/one-piece-1055-4.jpg'),
        require('@/assets/images/one-piece-1055-5.jpg'),
        require('@/assets/images/one-piece-1055-6.jpg'),
        require('@/assets/images/one-piece-1055-18.jpg'),
        require('@/assets/images/one-piece-1055-14.jpg'),
      ];

    return (
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
            <Image
            source={require('@/assets/images/one-piece-1055-2.jpg')}
            style={styles.headerImage}
            />
        }>
        <ThemedView style={styles.titleContainer}>
            <ThemedText style={styles.titleText} type="title">One Piece</ThemedText>
        </ThemedView>
        <ScrollView contentContainerStyle={styles.bookContent}>
            {mangaPages.map((page, index) => (
                <Image key={index} source={page} resizeMode='cover' style={styles.mangaPage} />
            ))}
        </ScrollView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    
  },
  titleText:{
    fontSize: 28,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'sans-serif',
    fontStyle: 'italic'
  },
  headerImage: {
    height: (screenWidth * 0.8 * 178) / 290,
    width: screenWidth * 0.8,
    //bottom: 0,
    left: (screenWidth - screenWidth * 0.8) / 2,
    position: 'absolute',
  },
  bookContent: {
    ///padding: 10,
    backgroundColor: 'red'
  },
  mangaPage: {
    width: screenWidth * 0.95, 
    height: 'auto', 
    aspectRatio: 3 / 4, 
    resizeMode: 'contain', 
    // marginBottom: 16, 
    alignSelf: 'center',
  },
});
