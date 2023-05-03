import React,{useState,useRef,useEffect} from 'react';
import { TouchableOpacity, Text, StyleSheet,View,Animated, Easing } from 'react-native';
import LottieView from "lottie-react-native";


const Post = () => {
   const [isLiked,setIsLiked] = useState(false);
   const animationProgress = useRef(new Animated.Value(0))


  const animation = React.useRef(null);
  const isFirstRun = React.useRef(true);
  
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 50000,
      
      useNativeDriver: false
    }).start();
  }, [isLiked])

  React.useEffect(() => {
    if (isFirstRun.current) {
      if (isLiked) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (isLiked) {
      animation.current.play(19, 50);
    } else {
      animation.current.play(0, 19);
    }
  }, [isLiked]);

  const onPress = ()=>{
      setIsLiked(!isLiked)
  }


  return (
    <View style={{display: 'flex',justifyContent:'center',alignItems:'center'}}>
     <View>
     <LottieView
                ref={animation}
                style={styles.heartLottie}
                source={require("./assets/lottie/like.json")}
                autoPlay={false}
                loop={false}
              />
     </View>

       <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>press</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heartLottie: {
    
    width: '80%',
    height: '80%',
    
    marginTop: 8
    
  },
});

export default Post;