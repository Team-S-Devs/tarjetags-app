import React from 'react';
import { Select, CaretIcon, ModalCloseButton } from 'react-responsive-select';

// for default styles...
import 'react-responsive-select/dist/react-responsive-select.css';

const CustomSelect = ( { valueRev, options=[], onChange, labelCustom="" } ) => {

    // hacer un array del string por cada 50
  // map

  let labelLettersArray = []

  for(let i = 0; i < labelCustom.length; i+=30){
    labelLettersArray.push(labelCustom.slice(i, i + 30))
  }

  return (
    <Select
      name="potentialHazards"
      modalCloseButton={<ModalCloseButton />}
      options={options}
      caretIcon={<CaretIcon />}
      selectedValue={
        options.filter((e) => {
          if(valueRev == e['text']) return e.value
        }).length > 0 ? options.filter((e) => {
          if(valueRev == e['text']) return e.value
        })[0].value : ""
      }
      onChange={(newVal) => onChange(newVal['value'])}
      customLabelRenderer={(label) => (
        <div style={{ color:'green', width: '200px'}}>
          <string>
            {
              labelLettersArray.map((letter, ltrindex) => <p style={{ marginTop: ltrindex == 0 ? 0 : -21 }}>{letter}</p>)
            }
          </string>
        </div>
      )}
    />
  )
}

export default CustomSelect;