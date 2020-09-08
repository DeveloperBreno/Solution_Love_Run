import React, { useEffect } from 'react';
import { Alert } from 'react-native';

// Função dinâmica apenas passar titulo e descrição.
export default function alerta(title, observacao) {
  Alert.alert(
    title,
    observacao,
    [{text: 'OK'}],
    {cancelable: false})
}