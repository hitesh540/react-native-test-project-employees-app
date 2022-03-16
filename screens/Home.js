// package imports
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Card, FAB } from 'react-native-paper'; 

const Home = ({navigation}) => {

  const data = [
    {id:"1", name:"mukesh", email:"abcd1234@abc",salary:"5 LPA",phone:"123123",position:"web dev",picture:"https://images.unsplash.com/photo-1601275378112-c0d3a890b077?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80"},
    {id:"2", name:"ramesh", email:"dbca1234@abc",salary:"6 LPA",phone:"823823",position:"App dev",picture:"https://images.unsplash.com/photo-1601275378112-c0d3a890b077?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80"},
    {id:"3", name:"suresh", email:"zbca1234@abc",salary:"7 LPA",phone:"623623",position:"ML dev",picture:"https://images.unsplash.com/photo-1601275378112-c0d3a890b077?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80"} 
  ]

  const renderList = ((item) => {
    return(
      <Card style={styles.mycard} key={item.id}
         onPress={()=> navigation.navigate("Profile",{item})}
      >
        <View style={styles.cardView}>
          <Image
                style={{ width:60, height:60, borderRadius:30 }}
                source={{uri:"https://images.unsplash.com/photo-1601275378112-c0d3a890b077?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80"}}
          />
          <View style={{ marginLeft:10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.position}</Text>
          </View>
        </View>  
      </Card>
    )
  })

  return (
       <View style={styles.root}>
          <FlatList
            data={data}
            renderItem={({item}) => {
              return  renderList(item)
            }}
            keyExtractor={item=>item.id}
          />
          <FAB onPress={()=> navigation.navigate("Create")}
            style={styles.fab}
            small
            icon="plus"
            theme={{colors:{accent:"#006aff"}}}
          />
       </View>
  )
}

const styles = StyleSheet.create({
  root:{
    flex:1
  },
  mycard:{
    margin:5,
  },
  cardView:{
    flexDirection:"row",
    padding:6
  },
  text:{
    fontSize:18,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export default Home