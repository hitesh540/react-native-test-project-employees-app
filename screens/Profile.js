// package imports
import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper'
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Profile = (props) => {

  const {id, name, picture, phone, salary, email, position} = props.route.params.item;

    const openDial = () => {
       if(Platform.OS === "android"){
         Linking.openURL(`tel:${phone}`)
       }else{
         Linking.openURL(`telprompt:${phone}`)
       }
    }

    return(
        <View style={styles.root}>
          <LinearGradient
            colors={["#0033ff", "#6bc1ff"]}
            style={{height:"20%"}}
          />
          <View style={{alignItems:"center"}}>
            <Image
                style={{width:140, height:140, borderRadius:140/2, marginTop:-50}}
                source={{uri:picture}}
            />
          </View>
          <View style={{alignItems:"center", margin:15}}>
              <Title>{name}</Title>
              <Text style={{fontSize:15}}>{position}</Text>
          </View>
          <Card style={styles.mycard} onPress={()=> {
              Linking.openURL(`mailto:${email}`)
          }}>
            <View style={styles.cardContent}>
                <MaterialIcons name="email" size={32} color="#006aff" />
                <Text style={styles.mytext}>{email}</Text>
            </View>
          </Card>
          <Card style={styles.mycard} onPress={()=> openDial()}>
            <View style={styles.cardContent}>
                <Entypo name="phone" size={32} color="#006aff" />
                <Text style={styles.mytext}>{phone}</Text>
            </View>
          </Card>
          <Card style={styles.mycard}>
            <View style={styles.cardContent}>
                <MaterialIcons name="attach-money" size={32} color="#006aff" />
                <Text style={styles.mytext}>{salary}</Text>
            </View>
          </Card>
          <View style={styles.buttonView}>
          <Button theme={theme} icon="account-edit" mode="contained" onPress={() => console.log('Pressed')}>
            Edit
          </Button>
          <Button theme={theme} icon="delete" mode="contained" onPress={() => console.log('Pressed')}>
            Fire Employee
          </Button>
          </View>
        </View>
    )
}

//styles

const theme = {
    colors:{
        primary:"#006aff"
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
    mycard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding:8
    },
    mytext:{
        fontSize:18,
        marginTop:3,
        marginLeft:5
    },
    buttonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    }
})

export default Profile