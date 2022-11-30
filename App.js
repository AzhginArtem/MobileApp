import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState} from 'react';
import {Animated} from 'react-native';
import Header from './Header';
import list from './assets/lists/list';
import * as Styled from './Styled';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default function App() {
  const [listNum, ChangeListNum] = useState(Math.floor(Math.random()*95));
  const [prevList, ChangePrevList] = useState([]);
  const [gestureName, ChangeGestureName] = useState('none');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const onSwipeUp = async (gestureState) => {
    let promise = new Promise((resolve) => {
      startAnimate()
      setTimeout(() => resolve(Math.floor(Math.random()*95)), 300);
    });
    let result = await promise;
    ChangePrevList(prevList => [...prevList, listNum]);
    ChangeListNum(result)
  }

  const onSwipeDown = async(gestureState) => {
    let promise = new Promise((resolve) => {
      startAnimate()
      setTimeout(() => resolve(Math.floor(Math.random()*95)), 300);
    });
    let result = await promise;
    ChangeListNum(prevList.pop());
  }

  const onSwipe = async(gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    ChangeGestureName(gestureName);
    switch (gestureName) {
      case SWIPE_UP:
        break;
      case SWIPE_DOWN:
        break;
    }
  }

  const startAnimate = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start()
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <GestureRecognizer 
    onSwipe={(direction, state) => onSwipe(direction, state)}
    onSwipeUp={state => onSwipeUp(state)}
    onSwipeDown={state => onSwipeDown(state)}
    config={config}>
      <Header/>
      <Styled.Body>
        <Animated.View style={{opacity: fadeAnim}}>
          <Styled.Title>{list[listNum]}</Styled.Title>
        </Animated.View>
      </Styled.Body>
      <StatusBar style="auto" />
    </GestureRecognizer>
  );
}