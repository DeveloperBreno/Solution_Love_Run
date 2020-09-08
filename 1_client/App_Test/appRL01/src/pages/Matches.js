
// Screen EXPLORE para localizar pessoas para match,
//  recebe os cards contento as informações dos usuários.

import React, {useState, useEffect} from 'react';
import {TextInput, Image, Switch, Picker, Slider,  TouchableOpacity, Text,  ScrollView, Modal, View, AsyncStorage, SafeAreaView } from 'react-native';

import styles from '../styles/index'

import Slideshow from 'react-native-simple-slideshow';


// https://icons.expo.fyi/
import {Octicons, FontAwesome, MaterialCommunityIcons, Feather, AntDesign, Entypo, Ionicons,  MaterialIcons, FontAwesome5} from '@expo/vector-icons';

import CardItem from '../components/CardItem'

export default function Matches(){
// esconder caixa amarela de avisos
console.disableYellowBox = true;

  return (

<SafeAreaView style={styles.container}>
        <View style={{paddingTop: 20 }}>
        
       <ScrollView>
       <View style={[{padding: 1, marginBottom: 100, flexWrap: "wrap", flexDirection: "row", }]}>
          <View style={styles.cardPessoa}>
            <ScrollView horizontal={true}>
            <Image
        style={styles.cardPessoaFoto}
        source={{
          uri: 'https://i.pinimg.com/originals/73/b4/5b/73b45b5636546b361e35012f483ed85f.jpg',
        }}
      />
       <Image
        style={styles.cardPessoaFoto}
        source={{
          uri: 'https://i.pinimg.com/originals/73/b4/5b/73b45b5636546b361e35012f483ed85f.jpg',
        }}
      />
       <Image
        style={styles.cardPessoaFoto}
        source={{
          uri: 'https://i.pinimg.com/originals/73/b4/5b/73b45b5636546b361e35012f483ed85f.jpg',
        }}
      />
              
            </ScrollView>
            <TouchableOpacity>
            <Text style={styles.title}>
              Vivian
            </Text>
          </TouchableOpacity>

            <View style={styles.viewBtn}>
            {/* cancelar */}
            <TouchableOpacity style={styles.btn} onPress={() => naoGostei("drth47352-b6kj3b-vnjo453-53v535v3")}>
              <FontAwesome name="times" size={30} style={styles.cor} />
            </TouchableOpacity>

            {/* mandar msg para a pessoa */}
            <TouchableOpacity style={styles.btn} >
              <Feather name="message-square" size={30} style={styles.cor} onPress={() => exibirChatModal("65869-54647-73767-757563757")} />
            </TouchableOpacity>

            {/* curtir a pessoa */}
            <TouchableOpacity style={styles.btn}>
              <AntDesign name="hearto" size={30} style={styles.cor} onPress={() => likeBack("875577-3535858-113179-1414597")} />
            </TouchableOpacity>
          </View>

          <View style={styles.detalhes}>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <Entypo name="resize-100-" size={24}  style={styles.cor} /> 1.60
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}> 26 anos </Text>
            </TouchableOpacity> 

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}> 60 kg </Text>
            </TouchableOpacity> 

            <TouchableOpacity>
              <Text style={styles.p}>
                <FontAwesome name="intersex" size={24} style={styles.cor} /> F 
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <Ionicons name="ios-color-palette" size={24} style={styles.cor} /> Rosa
              </Text>
            </TouchableOpacity> 

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <Entypo name="location" size={24} style={styles.cor} /> SP - São Paulo
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <AntDesign name="like2" size={24} style={styles.cor} /> Caminhar
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
              <Feather name="music" size={24} style={styles.cor} /> Auto-reverse - O Rappa
              </Text>
            </TouchableOpacity>

          </View>
          </View>
          <View style={styles.cardPessoa}>
            <ScrollView horizontal={true}>
            <Image
        style={styles.cardPessoaFoto}
        source={{
          uri: 'https://cms.rockymountain.com.br/runners/wp-content/uploads/sites/4/2016/07/mulher-correndo-treino-2.jpg',
        }}
      />
       <Image
        style={styles.cardPessoaFoto}
        source={{
          uri: 'https://cms.rockymountain.com.br/runners/wp-content/uploads/sites/4/2016/07/mulher-correndo-treino-2.jpg',
        }}
      />
       <Image
        style={styles.cardPessoaFoto}
        source={{
          uri: 'https://cms.rockymountain.com.br/runners/wp-content/uploads/sites/4/2016/07/mulher-correndo-treino-2.jpg',
        }}
      />
            </ScrollView>
            <TouchableOpacity>
            <Text style={styles.title}>
              Lisa
            </Text>
          </TouchableOpacity>

            <View style={styles.viewBtn}>
            {/* cancelar */}
            <TouchableOpacity style={styles.btn}  onPress={() => naoGostei("drth47352-b6kj3b-vnjo453-53v535v3")}>
              <FontAwesome name="times" size={30} style={styles.cor} />
            </TouchableOpacity>

            {/* mandar msg para a pessoa */}
            <TouchableOpacity style={styles.btn} >
              <Feather name="message-square" size={30} style={styles.cor} onPress={() => exibirChatModal("65869-54647-73767-757563757")} />
            </TouchableOpacity>

            {/* curtir a pessoa */}
            <TouchableOpacity style={styles.btn}>
              <AntDesign name="hearto" size={30} style={styles.cor} onPress={() => likeBack("875577-3535858-113179-1414597")} />
            </TouchableOpacity>
          </View>

          <View style={styles.detalhes}>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <Entypo name="resize-100-" size={24}  style={styles.cor} /> 1.69
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}> 18 anos </Text>
            </TouchableOpacity> 

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}> 58 kg </Text>
            </TouchableOpacity> 

            <TouchableOpacity>
              <Text style={styles.p}>
                <FontAwesome name="intersex" size={24} style={styles.cor} /> F 
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <Ionicons name="ios-color-palette" size={24} style={styles.cor} /> Amarelo
              </Text>
            </TouchableOpacity> 

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <Entypo name="location" size={24} style={styles.cor} /> SP - São Paulo
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <AntDesign name="like2" size={24} style={styles.cor} /> Correr
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
              <Feather name="music" size={24} style={styles.cor} /> ACDC - TNT
              </Text>
            </TouchableOpacity>

          </View>
          </View>
          <View style={styles.cardPessoa}>
            <ScrollView horizontal={true}>
            <Image
        style={styles.cardPessoaFoto}
        source={{
          uri: 'https://edge.alluremedia.com.au/m/g/2018/01/amazon-echo-range-Recovered-2.png',
        }}
      />
       <Image
        style={styles.cardPessoaFoto}
        source={{
          uri: 'https://edge.alluremedia.com.au/m/g/2018/01/amazon-echo-range-Recovered-2.png',
        }}
      />
       <Image
        style={styles.cardPessoaFoto}
        source={{
          uri: 'https://edge.alluremedia.com.au/m/g/2018/01/amazon-echo-range-Recovered-2.png',
        }}
      />
            </ScrollView>
            <TouchableOpacity>
            <Text style={styles.title}>
              Alexa
            </Text>
          </TouchableOpacity>

            <View style={styles.viewBtn}>
            {/* cancelar */}
            <TouchableOpacity style={styles.btn}  onPress={() => naoGostei("drth47352-b6kj3b-vnjo453-53v535v3")}>
              <FontAwesome name="times" size={30} style={styles.cor} />
            </TouchableOpacity>

            {/* mandar msg para a pessoa */}
            <TouchableOpacity style={styles.btn} >
              <Feather name="message-square" size={30} style={styles.cor} onPress={() => exibirChatModal("65869-54647-73767-757563757")} />
            </TouchableOpacity>

            {/* curtir a pessoa */}
            <TouchableOpacity style={styles.btn}>
              <AntDesign name="hearto" size={30} style={styles.cor} onPress={() => likeBack("875577-3535858-113179-1414597")} />
            </TouchableOpacity>
          </View>

          <View style={styles.detalhes}>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <Entypo name="resize-100-" size={24}  style={styles.cor} /> 0.30
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}> 1 anos </Text>
            </TouchableOpacity> 

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}> 0.50 kg </Text>
            </TouchableOpacity> 

            <TouchableOpacity>
              <Text style={styles.p}>
                <FontAwesome name="intersex" size={24} style={styles.cor} /> F 
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <Ionicons name="ios-color-palette" size={24} style={styles.cor} /> Preto
              </Text>
            </TouchableOpacity> 

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <Entypo name="location" size={24} style={styles.cor} /> New York City FC
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
                <AntDesign name="like2" size={24} style={styles.cor} /> Musica
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            <TouchableOpacity>
              <Text style={styles.p}>
              <Feather name="music" size={24} style={styles.cor} /> All
              </Text>
            </TouchableOpacity>

          </View>
          </View>
       </View>
       </ScrollView>
       </View>
    </SafeAreaView>     
       
    );
  }

