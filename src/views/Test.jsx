import MultiSelectInput from "../components/inputs/MultiSelectInput/MultiSelectInput";
import SelectInput from "../components/inputs/SelectInput/SelectInput";
import TextInput from "../components/inputs/TextInput/TextInput";
import Tittle from "../components/text/Tittle/Title";

export default function Test() {
  return (
    <div>
      <Tittle texto='Teste' />
      <TextInput width="20rem" label="Nome" />
      <TextInput width="20rem" border="1" borderColor="var(--light)" placeholder="Digite seu nome" />
      <SelectInput width="20rem" label="Opções" options={[
        {
          value: "1",
          text: "Opção 1"
        },
        {
          value: "2",
          text: "Opção 2"
        },
        {
          value: "3",
          text: "Opção 3"
        }]}
      />
      <MultiSelectInput width="20rem" label="Opções" options={[
        {
          value: "1",
          text: "Opção 1"
        },
        {
          value: "2",
          text: "Opção 2"
        },
        {
          value: "3",
          text: "Opção 3"
        }]}
      />
    </div>
  )
}