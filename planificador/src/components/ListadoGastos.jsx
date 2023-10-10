import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Gasto from './Gasto';

export const ListadoGastos = ({
  gastos,
  setModal,
  setGasto,
  gastosFiltrados,
  filtro,
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>GASTOS</Text>

      {filtro
        ? gastosFiltrados.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))
        : gastos.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
              setGasto={setGasto}
            />
          ))}
      {/* {gastos.length === 0 ? (
        <Text style={styles.noGastos}>No hay gastos</Text>
      ) : (
        gastos.map(gasto => (
          <Gasto
            key={gasto._id}
            gasto={gasto}
            setModal={setModal}
            setGasto={setGasto}
          />
        ))
      )} */}

      {gastos.length === 0 ||
        (gastosFiltrados === 0 && !!filtro && (
          <Text style={styles.noGastos}>No hay gastos</Text>
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    marginTop: 30,
    marginBottom: 100,
  },
  titulo: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  noGastos: {
    marginVertical: 20,
    // marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ListadoGastos;
