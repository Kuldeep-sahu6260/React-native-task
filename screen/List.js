import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import response from "../data";

const List = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  useEffect(() => {

    console.log(response);
    setData(response);
    setOldData(response);

  }, []);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text !== '') {
      let tempData = data.filter(item => {
        return item.doctorName.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(oldData);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 70,
          marginTop: 20,

          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '80%',
            height: 50,
            borderRadius: 10,
            borderWidth: 0.2,

            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
          }}>
          <Image
            source={require('./search.png')}
            style={{ width: 24, height: 24, marginLeft: 15, opacity: 0.5 }}
          />
          <TextInput
            ref={searchRef}
            placeholder="search doctor here..."
            style={{ width: '76%', height: 50 }}
            value={search}
            onChangeText={txt => {
              searchFilterFunction(txt);
              setSearch(txt);
            }}
          />
          {search == '' ? null : (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                searchRef.current.clear();
                searchFilterFunction('');
                setSearch('');
              }}>
              <Image
                source={require('./close.png')}
                style={{ width: 16, height: 16, opacity: 0.5 }}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={{
            marginRight: 15,
          }}
          onPress={() => {
            setVisible(true);
          }}>
          <Image
            source={require('./filter.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: '95%',

                borderRadius: 10,
                borderWidth: 0.5,
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: index == data.length - 1 ? 20 : 0,
                alignItems: 'center',
                flexDirection: "column",
              }}>
             <View style={{display:'flex',flexDirection:'row'}}>
             <Image
                source={{ uri: item.photoPath }}
                style={{
                  width: 80,
                  height: '90%',
                  marginLeft: 10,
                  borderRadius: 10,
                }}
              />
              <View style={{ width: '80%' }}>
                <Text
                  style={{ fontWeight: '600', marginLeft: 10, marginTop: 10 }}>
                  {item.doctorName}
                </Text>
                <Text style={{ fontSize: 12, margin: 10 }}>
                  {`Specialty-  ${item.specialization}`}
                </Text>
                <Text style={{ fontSize: 12, margin: 10 }}>
                  {`Consultation type-  ${item.consultationType}`}
                </Text>
                <Text style={{ fontSize: 12, margin: 10 }}>
                  {`clinic name-  ${item.clinicName}`}
                </Text>
                {
                  item.consultationType === 'PHYSICAL' && (
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 10,
                        fontWeight: '800',
                        color: 'green',
                      }}>

                      {`Address- ${item.clinicAddress}`}
                    </Text>
                  )
                }
      <Text style={{ fontSize: 12, margin: 10 }}>
                  {`SlotDate-  ${item.slotDate}`}
                </Text>


                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      fontWeight: '800',
                      color: 'orange',
                    }}>
      
                    {'Start -' + item.slotStartTime}
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      marginRight: 30,
                      fontWeight: '800',
                      color: 'orange',
                      marginLeft:2
                    }}>
                    {'End -' + item.slotEndTime}
                  </Text>

                </View>
              </View>
             </View>
             <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Prescription</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Invoices</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Rate</Text>
      </TouchableOpacity>
    </View>
            </View>
          );
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <View
            style={{
              width: '80%',
              height: 200,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(1);
                const strAscending = data.sort((a, b) =>
                  a.doctorName > b.title ? 1 : -1,
                );
                setData(strAscending);
                setVisible(false);
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}> Sort By Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(2);
                setData(data.sort((a, b) => Number(a.slotDate) - Number(b.slotDate)));
                setVisible(false);
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}>
                Sort date ascending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(3);
                setData(data.sort((a, b) => Number(b.slotDate) - Number(a.slotDate)));
                setVisible(false);
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}>
                sort date decending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                paddingLeft: 20,
              }}
              onPress={() => {
                setSelectedFilter(4);
                setData(data.sort((a, b) => a.rating.rate - b.rating.rate));
                setVisible(false);
              }}>
              <Text style={{ fontSize: 18, color: '#000' }}> Sort By Rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    display:"flex",
    flexDirection:'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    padding:3
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default List;