
// Screen EXPLORE para localizar pessoas para match,
//  recebe os cards contento as informações dos usuários.

import React, {useState, useEffect} from 'react';
import {TextInput, Image, Switch, Picker, Slider,  TouchableOpacity, Text,  ScrollView, Modal, View, AsyncStorage, SafeAreaView } from 'react-native';

import styles from '../styles/index'

import Slideshow from 'react-native-simple-slideshow';


// https://icons.expo.fyi/
import {Octicons, FontAwesome, MaterialCommunityIcons, Feather, AntDesign, Entypo, Ionicons,  MaterialIcons, FontAwesome5} from '@expo/vector-icons';

import CardItem from '../components/CardItem'

export default function Explore() {
  // Ajax("IPessoa",);
  

  let data = {
    Nome: "Isis Felix 2" ,
    Idade: "28 anos",
    Sexo: "F",
    Signo: "Peixes",
    Endereco: "SP - São Paulo",
    Altura: "1,60 cm",
    Peso: "50 kg",
    CorFavorita: "Roza",
    GostaDe: "Mountain running",
    Musica: "Du hast - rammstein",
    lsImg:[
      { url:'https://i.pinimg.com/originals/73/b4/5b/73b45b5636546b361e35012f483ed85f.jpg' },
      { url:'https://i.pinimg.com/originals/2a/91/ca/2a91ca75ed9296ea93b23b189584b231.jpg' },
      { url:'https://i.pinimg.com/originals/14/5e/32/145e32730c94b3e0a16fa1b180b99479.jpg' }
    ]
  };

  const [primeiraPessoa, setPrimeiraPessoa] = useState(data);
  
  // caso o usuario atual nao for pro, exibe modal pra ele pagar e ser pro
  const [modalNaoPago, setModalNaoPago] = useState(false);

  // caso pago o usuario manda apenas uma mensagem, de até 150 caracteres
  const [modalPago, setModalPago] = useState(false);

  const [msg, setMsg] = useState("");

  // para saber se a msg já foi enviada para a mesma pessoa
  const [msgEnviada, setMsgEnviada] = useState(false);

  // caso tenha algum erro de digitação na msg 
  const [msgValida, setMsgValida] = useState(true);

  // test 
  //Ajax('https://viacep.com.br/ws/01001000/json/', {} ,"GET");

  async function change(){

  let newData = {
    Nome: "Isis Felix rgergegh",
    Idade: "28 anos",
    Sexo: "F",
    Signo: "Peixes",
    Endereco: "SP - São Paulo",
    Altura: "1,60 cm",
    Peso: "50 kg",
    CorFavorita: "Roza",
    GostaDe: "Mountain running",
    Musica: "Du hast - rammstein",
    lsImg:[
      { url:'https://image.freepik.com/fotos-gratis/esporte-mulher-correndo-em-uma-estrada-fitness-mulher-treinando-ao-por-do-sol_61573-2029.jpg' },
      { url:'https://cms.rockymountain.com.br/runners/wp-content/uploads/sites/4/2016/07/mulher-correndo-treino-2.jpg' },
      { url:'https://blackambar.files.wordpress.com/2014/02/mulher-correndo-da-praia-1387393816604_956x500.jpg' }
    ]
  };

  await setPrimeiraPessoa(newData);

  }
  
  async function enviarMensagem(){
    let mensagem = await ValidaTexto(msg);
    setMsg(mensagem);
    // se existe a mensagem, enviar
    if (mensagem.length !== 0) {
      // ocultar o erro
      setMsgValida(true);
      // fazer ajax para ws
      // fazer depois

      // ocultar campos que aparecem antes do envio 
      setMsgEnviada(true);

    }
    // se não existe a msg, alertar
    else{
      // exibir na tela o erro
      setMsgValida(false);
    }
  }

  // se retirar o comentario
  async function validarMsg(){
    // não caso pago
    //setModalNaoPago(true);

    // caso pago
    setModalPago(true);
  }

  function fecharModalEResetarState(){
    // fechar modal
    setModalPago(false);
  }

  // quando apertar em not like
  function notLike(){

    // exibir os campos que aparecem antes do envio
    // apenas fazer isso quando o usuario der não ou sim, e pular para a proxima pessoa
    setMsgEnviada(false);
    setMsg("");

  }

  // esconder caixa amarela de avisos
  console.disableYellowBox = true;

  return (
    <SafeAreaView style={styles.container}>
 
 {/* Modal seja pro*/}
 <Modal  visible={modalNaoPago}>
        <SafeAreaView style={styles.container}>
        <View>
        <View style={[{flexWrap: "wrap", flexDirection: "row"}, styles.bottom]} >
         <View style={{width: "20%"}} >
           <TouchableOpacity onPress={() => setModalNaoPago(false)}>
             <Text style={styles.p}>
               <AntDesign name="close" size={24} style={styles.cor} /> 
             </Text>
           </TouchableOpacity>
         </View>
         <View style={{width: "60%"}} >
           <TouchableOpacity>
             <Text style={[styles.p, {textAlign: "center"}]}>
             Seja pro
             </Text>
           </TouchableOpacity>
         </View>
         </View>
       <ScrollView>
       <View style={{padding: 10, marginBottom: 100}}>
        <Text style={styles.p}>
        Seja pro, envie mensagens livremente, interaja com quem gostou de você.   <MaterialCommunityIcons name="professional-hexagon" size={24} style={styles.corPro} />
        </Text>
        <TouchableOpacity style={{alignItems: "center", backgroundColor: ""}}>
          <Text style={styles.p}>
          <FontAwesome name="shopping-cart" size={24} style={styles.cor} /> Add ao carrinho
          </Text>
        </TouchableOpacity>
       </View>
       </ScrollView>
       </View>
    </SafeAreaView>
        </Modal>

{/* Modal mensagem*/}
<Modal  visible={modalPago}>
        <SafeAreaView style={[styles.container]}>
        <View>
        <View style={[{flexWrap: "wrap", flexDirection: "row"}, styles.bottom]} >
         <View style={{width: "15%"}} >
           <TouchableOpacity onPress={fecharModalEResetarState}>
             <Text style={styles.p}>
               <AntDesign name="close" size={24} style={styles.cor} /> 
             </Text>
           </TouchableOpacity>
         </View>
         <View style={{width: "80%"}} >
           <TouchableOpacity>
             <Text style={[styles.p, {textAlign: "left"}]}>
             Nome da outra pessoa
             </Text>
           </TouchableOpacity>
         </View>
         </View>
       <ScrollView>
       <View style={{padding: 10, marginBottom: 100}}>

        {/* se ainda não mandou msg para essa pessoa  */}
        { msgEnviada === false &&
        <Text style={styles.p}>
        Escreva apenas uma mensagem como primeiro contato  
        </Text>
         }
          {/* se ainda não mandou msg para essa pessoa  */}
          { msgEnviada === false &&
          <TextInput 
             style={[styles.TextInpu, {height: 80}]} 
             multiline={true} 
             placeholder="Digite sua mensagem." 
             maxLength={150}
             value={msg}
             onChangeText={t => setMsg(t)}            
             />
          }
          {/* se tiver erro na msg digitada */}
          { msgValida === false &&
          <Text style={[styles.corDanger, {fontSize: 15}]}>
            Digite corretamente! <MaterialIcons name="error" size={18} style={styles.corDanger} />
          </Text>
          }
          

           {/* se ainda não mandou msg para essa pessoa  */}
           { msgEnviada === false &&
              <Text style={[styles.p, {fontSize: 15, margin: 0, padding: 0, textAlign: "right"}]}>
             {msg.length}/150
           </Text>
           }
            {/* se ainda não mandou msg para essa pessoa  */}
            { msgEnviada === false &&
            <TouchableOpacity style={{alignItems: "center", backgroundColor: ""}} onPress={enviarMensagem}>
            <Text style={styles.p}>
              <Octicons name="comment" size={24} style={styles.cor} /> Enviar
            </Text>
          </TouchableOpacity>
          }

       
        {/* se msg já foi enviada para a mesma pessoa, apenas para o usuario atual ver na tela que a msg dele foi emviada*/}
        { msgEnviada === true &&
            <TouchableOpacity>
              <Text style={[{textAlign: "center", fontSize: 22, borderColor: "#cdcdcd", borderWidth: 1, borderRadius: 10}, styles.cor]}>
                {msg + "\nEnviado com sucesso!"}
              </Text>
            </TouchableOpacity>
        }

        
       </View>
       </ScrollView>
       </View>
    </SafeAreaView>
        </Modal>



      <ScrollView >
        <View>
          <Slideshow
          height={500}
          // comeca da img 0
          position={0}
          // bolinhas
          indicatorColor="rgba(255, 255, 255, 0)"
          indicatorSelectedColor="rgba(255, 255, 255, 0)"
          dataSource={primeiraPessoa.lsImg}/>
          {/* <ImageBackground source={require('../assets/images/particulas.jpg')} style={styles.image}> */}
          <TouchableOpacity>
            <Text style={styles.title}>
              {primeiraPessoa.Nome}
            </Text>
          </TouchableOpacity>

          {/* Btns para negar, msg e like */}
          <View style={styles.viewBtn}>
            {/* cancelar */}
            <TouchableOpacity style={styles.btn}>
              <FontAwesome name="times" size={30} style={styles.cor} />
            </TouchableOpacity>

            {/* mandar msg para a pessoa */}
            <TouchableOpacity style={styles.btn} onPress={validarMsg} >
              <Feather name="message-square" size={30} style={styles.cor} />
            </TouchableOpacity>

            {/* curtir a pessoa */}
            <TouchableOpacity style={styles.btn} onPress={() => like("876gege-v3653v63v3-v36336nz-b7474x3y")} >
              <AntDesign name="hearto" size={30} style={styles.cor} />
            </TouchableOpacity>
          </View>
          <View style={styles.detalhes}>

            {/* se contem */}
            {primeiraPessoa.Altura != undefined && primeiraPessoa.Altura.length > 0 &&
            <TouchableOpacity>
              <Text style={styles.p}>
                <Entypo name="resize-100-" size={24}  style={styles.cor} /> {primeiraPessoa.Altura} 
              </Text>
            </TouchableOpacity> }

            {/* se contem */}
            {primeiraPessoa.Idade != undefined && primeiraPessoa.Idade.length > 0 &&
            <TouchableOpacity>
              <Text style={styles.p}>
                {primeiraPessoa.Idade} 
              </Text>
            </TouchableOpacity> }

            {/* se contem */}
            {primeiraPessoa.Peso != undefined && primeiraPessoa.Peso.length > 0 &&
            <TouchableOpacity>
              <Text style={styles.p}>
                {primeiraPessoa.Peso} 
              </Text>
            </TouchableOpacity> }

            <TouchableOpacity>
              <Text style={styles.p}>
                <FontAwesome name="intersex" size={24} style={styles.cor} /> {primeiraPessoa.Sexo} 
              </Text>
            </TouchableOpacity>

            {/* se contem */}
            {primeiraPessoa.CorFavorita != undefined && primeiraPessoa.CorFavorita.length > 0 &&
            <TouchableOpacity>
              <Text style={styles.p}>
                <Ionicons name="ios-color-palette" size={24} style={styles.cor} /> {primeiraPessoa.CorFavorita} 
              </Text>
            </TouchableOpacity> }

            {/* se contem */}
            {primeiraPessoa.Endereco != undefined && primeiraPessoa.Endereco.length &&
            <TouchableOpacity>
              <Text style={styles.p}>
                <Entypo name="location" size={24} style={styles.cor} /> {primeiraPessoa.Endereco} 
              </Text>
            </TouchableOpacity> }

            {/* se contem */}
            {primeiraPessoa.GostaDe != undefined && primeiraPessoa.GostaDe.length > 0 &&
            <TouchableOpacity>
              <Text style={styles.p}>
                <AntDesign name="like2" size={24} style={styles.cor} /> {primeiraPessoa.GostaDe} 
              </Text>
            </TouchableOpacity> }

            {/* se contem */}
            {primeiraPessoa.Musica != undefined && primeiraPessoa.Musica.length > 0 &&
            <TouchableOpacity>
              <Text style={styles.p}>
              <Feather name="music" size={24} style={styles.cor} /> {primeiraPessoa.Musica} 
              </Text>
            </TouchableOpacity> }
          </View>

          <Text onPress={change} style={{fontSize: 30}}>
            teste mudar 
          </Text>
          {/* </ImageBackground> */}
        </View>
      </ScrollView>
    </SafeAreaView>);
}
