import React, { useState } from 'react';
import {
    FlatList, SafeAreaView, StatusBar, StyleSheet, Text,
    Button,
    TouchableOpacity
} from 'react-native'

const data = [
    {
        id: 1,
        title: "Psy Expo",
        location: 'Toronto',
        date: 'March 31, 2023',
        description: ''
    },
    {
        id: 2,
        title: "Psy Art Exibition",
        location: 'Montreal',
        date: 'March 31, 2023'
    },
];

function Item({ item, onPress, backgroundColor, textColor }) {
    const [btnText, setBtnText] = useState('Join');
    return (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text>{item.location}</Text>
        <Text>{item.date}</Text>
        <Text>{item.description}</Text>
        <Button title={btnText} color="#841584" 
        onPress={() => {            
            if (btnText === 'Join') {
                setBtnText('Cancel Request');
            }
            else {
                setBtnText('Join');
            }
        }}
        />
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default function EventList() {
    const [selectedId, setSelectedId] = useState();

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    return (
        <>
        <Text>List of all upcoming events</Text>
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
            />
        </SafeAreaView>
        </>
    );

}