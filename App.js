import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Modal, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const onHandleChange = (text) => {setTask(text)}

  const onHandlerSubmit = () => {
    setTasks([
      ... tasks,
      {
        id: Math.random().toString(),
        value: task
      }
    ]);
    setTask('');
  }

  const onHandlerModal = (item) => {
    setIsModalVisible(!isModalVisible)
    setSelectedTask(item);

  }

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onHandlerModal(item)}> 
    <Text style={styles.itemList}>{item.value}</Text>
    </TouchableOpacity> 
    
  )

  const keyExtractor = (item) => item.id;

  const onHandleCancel = () => {
    setIsModalVisible(!isModalVisible);
    setSelectedTask(null);
  }

  const onHandleDelete =() =>{
    setTasks((prevTaskList)=> prevTaskList.filter((task) => task.id !== selectedTask.id));
    setIsModalVisible(!isModalVisible);

  }

 // console.warn('tasks', tasks)//

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
        style={styles.input} 
        placeholder='add a new task'
        autoComplete= 'off'
        autoCorrect= {false}
        value={task}
        onChangeText={onHandleChange}
        />
        <Button disabled={!task} title='Add' color='#6F73D2' onPress={onHandlerSubmit} />
      </View>
      <FlatList
       data={tasks} 
       renderItem={renderItem}
       keyExtractor={keyExtractor}
       style={styles.listContainer}
      />
      <Modal visible={isModalVisible} animationType='slide'>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>item Detail</Text>
        <View style={styles.modalDetailContainer}>
          <Text style={styles.modalDeleteMessage}>Delete this item?</Text>
          <Text style={styles.selectedTask}>{setSelectedTask.value}</Text>
        </View>
        <View style={styles.modalButton}>
          <Button
            title='Cancel'
            color='#6F73D2'
            onPress={onHandleCancel}/>
          <Button
            title='Delete'
            color='#83C9F4'
            onPress={onHandleDelete}/>
        </View>
      </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AA7DD',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginHorizontal: 20,
  },
  input: {
    width: '85%',
    borderBottomColor: '#6F73D2',
    borderBottomWidth: 1,
    height: 40,
    color: '#212121'
  },
  listContainer: {
    marginHorizontal: 20,
    marginTop:40
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor:'#6F73D2'
  },
  itemList: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'normal'
  },
  modalContainer: {
    justifyContent: 'center',
    marginTop: 40,
    paddingTop: 40,
    alignItems: 'center'

  },
  modalTitle:{
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 10,

  },
  modalDetailContainer: {
    paddingVertical: 20,

  },
  modalDeleteMessage:{
    fontSize: 14,
    color: '#000'

  },
  selectedTask:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center'

  },
  modalButton: {
    width:'75%',
    flexDirection:'row',
    justifyContent: 'space-around',
    marginHorizontal: 20
  }
});
