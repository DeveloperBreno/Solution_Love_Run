
// componente CARD, responsável por trazer as informações do bd, 
//  e trasnformar em cards.

//  -->> Em desenvolvimento


import React, { Component } from 'react';

import { 
  Text, 
  View,
  Dimensions, 
  Image, 
  Animated,
  PanResponder, 
  ImageBackground
} from 'react-native';

import CardUser from '../data/dataTest';


const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width


export default class Card_Item extends Component {

  constructor(){
    super()

    this.position = new Animated.ValueXY()

    this.state = {
      currentIndex: 0
    }

    //definindo as proporções
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: ['-10deg','0deg','10deg'],
      extrapolate: 'clamp'
      
    })

    this.rotateAndTranslate = {
        transform: [{
          rotate: this.rotate

        },
        ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    this.deslikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_HEIGHT / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })
    //


    //forma correta de adicionar os eventos por gestos, não utilizando o componentWillMount
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue( { x: gestureState.dx, y:gestureState.dy } )

      },

      onPanResponderRelease: (evt, gestureState) => {

        if(gestureState.dx > 180){

          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy},
            useNativeDriver: true
          }).start( () => {
            this.setState({ currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0})
            })
          })
      
        }
        else if(gestureState.dx < -180){
      
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy},
            useNativeDriver: true
          }).start( () => {
            this.setState({ currentIndex: this.state.currentIndex + 1}, () => {
              this.position.setValue({x: 0, y: 0})
            })
          })
      
        }
        //limitar o gesto das imagens para cima ou para baixo
        else{
          Animated.spring(this.position, {
            toValue: { x: 2, y: 2},
            friction: 2,
            useNativeDriver: true
          }).start()
        }
        
        
      }

    })

  }

  renderUserImages = () => {   

    return CardUser.map((item, i) => {

      if(i < this.state.currentIndex){
      
        return null
      }
      else if(i === this.state.currentIndex){

        return(
              
          <Animated.View 
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={  [ this.rotateAndTranslate, 
            {height: SCREEN_HEIGHT - 180, 
            width: SCREEN_WIDTH, position: 'absolute', 
            padding: 12 } ]}
          >
            <Animated.View 
              style={ {opacity: this.likeOpacity, 
                transform:[{ rotate: '-40deg'}], 
                      position: 'absolute', top: 50, left: 30, zIndex: 1000} }>
              <Text 
                style={ {color: 'white', fontSize: 30, fontWeight: '800', 
                borderWidth: 3, borderRadius: 15, backgroundColor: 'green', borderColor: 'green', padding: 8} }>
                Sim
              </Text>
            </Animated.View>

            <Animated.View 
              style={ {opacity: this.deslikeOpacity, transform:[{ rotate: '40deg'}], 
                      position: 'absolute', top: 50, right: 30, zIndex: 1000} }>
              <Text style={ {color: 'white', fontSize: 29, fontWeight: '800', 
                          borderWidth: 3, borderRadius: 15, backgroundColor: 'red', borderColor: 'red', padding: 8} }>
                Não
              </Text>
            </Animated.View>
  
            <Image 
              style={ {flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 25 } }
              source={ item.uri } 
            />
  
          </Animated.View>
  
        )
      }
      else{
        return(
              
          <Animated.View 
            key={item.id}
            style={  [ 
              { opacity: this.nextCardOpacity,
                transform: [ {scale: this.nextCardScale }],
                height: SCREEN_HEIGHT - 180, 
                width: SCREEN_WIDTH, 
                position: 'absolute', 
                padding: 15 
              } 
            ]
          }
          >
              <Animated.View
                style={ {opacity: 0, transform: [{ rotate: '-40deg'}], position: 'absolute', top: 50, left: 30, zIndex: 1000} }>
                <Text style={ {color: 'white', fontSize: 30, fontWeight: '800', borderWidth: 3, borderRadius: 15, 
                                backgroundColor:'green', borderColor: 'green', padding: 8} }>
                  LIKE
                </Text>
              </Animated.View>

              <Animated.View
                style={ {opacity: 0, transform: [{ rotate: '40deg'}], position: 'absolute', top: 50, right: 30, zIndex: 1000} }>
                <Text style={ {color: 'white', fontSize: 29, fontWeight: '800', borderWidth: 3, borderRadius: 15, 
                               backgroundColor:'red', borderColor: 'red', padding: 8} }>
                  NOPE
                </Text>
              </Animated.View>
    
              <Image 
                style={ {flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 25 } }
                source={ item.uri } 
              />
  
          </Animated.View>  
        )
      }
      
        // utilizado por hora para retornar a primeira imagem
    }).reverse()
  }

  render(){
    return (                
     
        <View style={{marginTop: 40}}>

          {this.renderUserImages()}

        </View>     
    );
  }
}
