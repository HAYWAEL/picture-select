import * as React from 'react';

interface Picture {
  id: string,
  name: string,
  url: string
}

type Props = {
  pictures: Picture[],
  value: string[],
  onChange: Function
}
type CheckboxProps = {
  children?: string,
  onChange?: (e: boolean) => void;
  checked?: boolean,
  style?: React.CSSProperties;

}
const Checkbox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { children, onChange, checked, style },
) => {
  const handleChange = (e: any) => {
    onChange && onChange(e.target.checked)
  }
  return <label style={style}>
    <input type="checkbox" onChange={handleChange} checked={checked} />
    {children !== undefined && <span>{children}</span>}
  </label>
}

export const PictureSelect = (props: Props) => {
  const { pictures = [], value = [], onChange } = props;
  const [checkAll, setCheckAll] = React.useState(pictures.length===value.length);

  const handleChange = (id: string) => {
    const isIncludes = value.includes(id)
    const nextValue = isIncludes ? value.filter(item => item !== id) : [...value, id];
    const isAll = !isIncludes&&(nextValue.length === pictures.length);
    if(checkAll!==isAll){
      setCheckAll(isAll);
    }
    onChange(nextValue)
  };

  const handleCheckAllChange = (e: boolean) => {
    setCheckAll(e);
    const nextValue = e ? pictures.map(pic => pic.id) : []
    onChange(nextValue)
  }

  return <div className="index">
    <Checkbox onChange={handleCheckAllChange} checked={checkAll}>全选</Checkbox>
    <div className="pictures" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 100px)',justifyItems: "stretch", gridColumnGap: 20,gridRowGap: 20 }}>
      {pictures.map(pic => {
        return <div style={{ position: 'relative' }} key={pic.id} onClick={() => handleChange(pic.id)}>
          <Checkbox style={{ position: 'absolute' }} checked={value.includes(pic.id)}></Checkbox>
          <img src={pic.url} style={{ width: '100%' ,height: '100%'}} ></img>
        </div>
      })}
    </div>

  </div>;
};
