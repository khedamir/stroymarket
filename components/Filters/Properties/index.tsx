import { NextRouter, useRouter } from 'next/router';
import React, { ChangeEvent, FC } from 'react';
import { PropertyType } from '../../../@types/types';
import { CatalogQueryParams } from '../../../request';
import Checkbox from '../../Checkbox';
import Popup from '../../Popup';

interface Property {
  [key: string]: string;
}

interface PropertiesProps {
  properties: PropertyType[];
  query: CatalogQueryParams;
  filter: () => void;
}

const parseQuery = (router: NextRouter, properties: PropertyType[]) => {
  const output: Property = {};
  if (router.query) {
    properties.forEach((item) => {
      if (router.query[`properties[${item.id}]`] !== undefined) {
        output[`properties[${item.id}]`] = router.query[`properties[${item.id}]`] as string;
      }
    });
  }
  return output;
};

const Properties: FC<PropertiesProps> = ({ properties, query, filter }) => {
  const router = useRouter();

  const handlePropertySelect = (id: number, value: string | number, event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    // @ts-ignore
    const selectedValue = query[`props[${id}]`];
    if (!checked && !selectedValue) {
      return false;
    }
    if (checked && !selectedValue) {
      // @ts-ignore
      query[`props[${id}]`] = value.toString();
    }
    if (selectedValue) {
      let selectedValuesArray = selectedValue.toString().split(',');
      if (!checked) {
        selectedValuesArray.splice(
          selectedValuesArray.findIndex((v: any) => v === value),
          1
        );
        // @ts-ignore
        query[`props[${id}]`] = selectedValuesArray.join(',');
        // @ts-ignore
        if (query[`props[${id}]`].length === 0) {
          // @ts-ignore
          delete query[`props[${id}]`];
        }
        filter();
        return true;
      }
      selectedValuesArray.push(value);
      // @ts-ignore
      query[`props[${id}]`] = selectedValuesArray.join(',');
    }
    filter();
    return true;
  };
  const isChecked = (id: number, value: string) => {
    // @ts-ignore
    if (query[`props[${id}]`]) {
      // @ts-ignore
      return query[`props[${id}]`].split(',').findIndex((v) => v === value) !== -1;
    }
    return false;
  };

  return (
    <>
      {properties.map((prop) => (
        <Popup key={prop.id} preview={prop.name}>
          {prop.values.map((value: string) => (
            <li key={value}>
              <Checkbox
                id={value}
                defaultChecked={isChecked(prop.id, value)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handlePropertySelect(prop.id, value, event)}
              />
              <label htmlFor={value}>{value}</label>
            </li>
          ))}
        </Popup>
      ))}
    </>
  );
};

export default Properties;
