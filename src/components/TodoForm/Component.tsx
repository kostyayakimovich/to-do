import React, { useRef } from 'react';
import './style.css';

interface ITodoFormProps {
  onAdd(title: string): void;
}

const TodoForm: React.FC<ITodoFormProps> = (props) => {
  const ref = useRef<HTMLInputElement>(null);

  // const [title, setTitle] = useState<string>('');
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  // };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      props.onAdd(ref.current!.value);
      ref.current!.value = '';

      // console.log(title);
      // setTitle('');
    }
  };
  return (
    <>
      <div className="input-field mt">
        <input
          ref={ref}
          // onChange={handleChange}
          onKeyPress={handleKeyPress}
          // value={title}
          type="text"
          id="title"
          placeholder="Введите название дела"
        />
        <label htmlFor="title" className="active">
          Введите название дела
        </label>
      </div>
    </>
  );
};

export default TodoForm;
