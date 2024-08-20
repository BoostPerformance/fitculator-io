function Options() {
  return (
    <>
      <option
        className="border-gray-9 border-[0.1rem] rounded-[0.375rem]"
        value="volvo"
      >
        Volvo
      </option>
      <option value="saab">Saab</option>
      <option value="fiat">Fiat</option>
      <option value="audi">Audi</option>
    </>
  );
}

export default function Dropdown() {
  return (
    <>
      <select className="w-[15rem] h-[3rem] border-gray-9 border-[0.1rem] rounded-[0.375rem]">
        <Options />
      </select>
    </>
  );
}
