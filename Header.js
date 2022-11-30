import { StatusBar } from "expo-status-bar";
import { Text, View } from 'react-native';
import styled from "styled-components";
import {HeaderTitle} from "./Styled";

const Block = styled.View`
    background-color: darkmagenta;
    height: 100px;
    width: 100%;
    border-bottom: 5px solid darkslategray;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function Header() {
    return (
        <Block>
            <HeaderTitle>МОТИВАТОР</HeaderTitle>
            <StatusBar style="auto" />
        </Block>
    )
}
