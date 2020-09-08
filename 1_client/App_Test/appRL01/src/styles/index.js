import { StyleSheet } from "react-native";


export default StyleSheet.create({

	//Menu tab 
	iconMenu: {
			height: 30,
			paddingBottom: 0,
	},
	

	//LOGIN
	background: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	containerLogo: {
		flex:1,
		justifyContent: 'center'
	},
	containerComponents: {
		flex:1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '90%',
	},
	inputLogin: {
		backgroundColor: '#FFF',
		width: '90%',
		marginBottom: 15,
		color: '#222',
		fontSize: 20,
		borderRadius: 7,
		padding: 10
	},
	btnAcessar: {
		backgroundColor: '#35AAFF',
		width: '60%',
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 7,
	},
	txtAcessar: {
		color: '#FFF',
		fontSize: 17,
	},
	btnNewCount: {	
		marginTop: 18,
	},
	txtNewCount: {
		color: '#FFF',
		fontSize: 15,
	},
	container: {
		flex: 1,
		// alignItems: 'center',
		backgroundColor: '#FFF',
	  },
	  cor: {color: '#5f6368'},
	  corDanger: {color: 'rgb(224, 9, 4)'},
	  corPro: {color: '#f7b900'},
	  fundoPro: {backgroundColor: '#f7b900'},
	  title: {
		fontSize: 23,
		fontWeight: 'bold',
		color: '#5f6368',
		textAlign: "center",
		borderRadius: 7,
		marginTop: 1,
		padding: 2
	  },
	  separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	  },
	  p:{
		color: "#5f6368",
		fontSize: 20,
		margin: 3,
		borderRadius: 10,
		padding: 7,
	  },
	  detalhes:{
		padding: 10,
		backgroundColor: '#28313900',
		flexDirection: "row",
		display: "flex",
		flexWrap: "wrap"
	  },
	  btn:{
		width: 90,
		borderRadius: 1000,
		textAlign: "center",
		alignItems: "center",
		margin: 10
	  },
	  viewBtn:{
		flexDirection: "row",
		justifyContent:"center",
		backgroundColor: '#28313900'
	  },
	  image: {
		flex: 1,
		resizeMode: "cover",
	  },
	  imgBtn:{
		width: 50,
		height: 50,
		resizeMode: 'stretch',
		marginTop: 20
	  },
	  fotoChat:{
		width: 60,
		height: 60,
		//resizeMode: 'stretch',
		borderRadius: 200
	},
	  tinyLogo: {
		  width: 100,
		  height: 100,
		  borderRadius: 100,
		  marginTop: 10
		},
		logo: {
		  width: 80,
		  height: 71,
		},
		TextInput:{
			borderColor: '#e8e6e3',
			borderBottomWidth: 1,
			color: '#5f6368',
			height: 50,
			fontSize: 20,
			width: "100%",
			marginBottom: 2

		},
		bottom:{
		  borderColor: '#5f6368',
		  borderBottomWidth: 2,
		},
		btnSetCor: {
		  width: 70,
		  height: 70,
		  borderRadius: 2,
		  borderColor: "#000",
		  // borderWidth: StyleSheet.hairlineWidth,
		  margin: 1
		},
		thumb:{
		  width: 20,
		  height: 20,
		  borderColor: 'white',
		  borderWidth: 1,
		  borderRadius: 10,
		  shadowColor: 'black',
		  shadowOffset: {
			  width: 0,
			  height: 2
		  },
		  shadowRadius: 2,
		  shadowOpacity: 0.35,
		},
		cardPessoa: {
		  width: "98%",
		  minHeight: 100,
		  marginLeft: "1%",
		  marginRight: "1%",
		  shadowColor: "#000",
		  borderColor: "#5f6368",
		  borderWidth: 1,
		  borderRadius: 5,
		  paddingBottom: 5,
		  marginTop: 5,
		  paddingTop: 0
		},
		cardPessoaFoto: {
		  width: 300,
		  height: 300,
		  borderRadius: 5,
		  marginRight: 2
		}
});