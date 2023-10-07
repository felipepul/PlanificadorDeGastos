import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

export const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.texto}>Planificador de gastos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B82F6',
  },
  texto: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
  },
});
