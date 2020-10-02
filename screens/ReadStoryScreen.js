import React from 'react';
import { StyleSheet, Text, View ,FlatList,ScrollView} from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import db from '../config'

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      allStories:[],
      dataSource:[],
      search : ''
    }
  }
  componentDidMount(){
    this.fetchStories()
  }

  updateSearch = search => {
    this.setState({ search: search });
  };


  fetchStories=()=>{
    try {
      var allStories= [];
      var stories = db.collection("Stories").get()
      .then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots              
              allStories.push(doc.data())
          })
          this.setState({allStories: allStories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };


  SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((story)=> {

      const storyData = story.TitleoftheStory ? story.TitleoftheStory.toUpperCase() 
      : ''.toUpperCase();
      const data = story.AuthoroftheStory ? story.AuthoroftheStory.toUpperCase() 
      : ''.toUpperCase();
      const textData = text.toUpperCase();
      return storyData.indexOf(textData) > -1;
      return data.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

    render(){
      return(
        <View>
           <Header
              backgroundColor={'#DF3A01'}
              centerComponent={{
                text: 'STORY HUB',
                style: {
                  color: '#FFFFFF',
                  fontSize: 30,
                  fontWeight: 'bold',
                },
              }}
          />
          <View styles ={{height:20,width:'100%'}}>
              <SearchBar
                  placeholder="Search for any story title"
                  onChangeText={text => this.SearchFilterFunction(text)}
                  onClear={text => this.SearchFilterFunction('')}
                  value={this.state.search}
                  backgroundColor = "white"
            />
          </View>
          
          <ScrollView>
            {this.state.dataSource.map((story)=>{
              return (
                <View style={styles.storyContainer}>
                  <Text style={{fontSize: 20}}>  TITLE:  {story.TitleoftheStory}</Text>
                  <Text style={{fontSize: 20}}>  AUTHOR :  {story.AuthoroftheStory}</Text>
                </View>
              )
            })}
            </ScrollView> 
          
          
          
        </View>  
      );      
    }
}


const styles = StyleSheet.create({
  story: {
    backgroundColor: 'pink',
    padding:10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  TitleoftheStory: {
    fontSize: 32,
  },
  storyContainer: {
    height: 80,
    width:'100%',
    borderWidth: 2,
    backgroundColor: "lightgrey",
    borderColor: 'purple',
    justifyContent:'center',
    alignSelf: 'center',
  }
});
