import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, HandlerStateChangeEvent, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const BookFlip = ({ pages }: { pages: Array<string> }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const translateX = useSharedValue(0);

  // Define the event type for the gesture handler
  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;
    translateX.value = translationX;
  };
 
console.log("wfefwefw",pages[currentPage])
const firstImage=pages[currentPage]

console.log("firstImage",firstImage)
  const onGestureEnd = (event: HandlerStateChangeEvent<Record<string, unknown>>) => {
    const { translationX, velocityX } = (event as any).nativeEvent;

    if (translationX < -width / 3 || velocityX < -500) {
      // Go to the next page
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    } else if (translationX > width / 3 || velocityX > 500) {
      // Go to the previous page
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    }

    // Reset the translation after swipe
    translateX.value = withSpring(0);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureHandlerRootView>
<PanGestureHandler
      onGestureEvent={onGestureEvent}
      onEnded={onGestureEnd}
    >
      <Animated.View style={[styles.pageContainer, animatedStyle]}>
        <Image
          source={pages[currentPage]}
          style={styles.pageImage}
          resizeMode="contain"
        />
        <Text style={styles.pageText}>
          Page {currentPage + 1} of {pages.length}
        </Text>
      </Animated.View>
    </PanGestureHandler>
    </GestureHandlerRootView>
    
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  pageImage: {
    width: 300,
    height: 400,
  },
  pageText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default BookFlip;
