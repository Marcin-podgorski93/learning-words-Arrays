import { List } from "../List/List";
import styles from "./Panel.module.css";
import { Form } from "../Form/Form";
import { FilterButton } from "../FilterButton/FilterButton";
import { useState } from "react";

export function Panel() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  function handleFormSubmit(formData) {
    setData((prevValue) => [...prevValue, formData]);
  }

  function handleDeleteItem(id) {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  }

  function handleFilterClick(category) {
    setSelectedCategory(category);
  }

  const filteredData = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : data;

  return (
    <>
      <section className={styles.section}>
        <Form onFormSubmit={handleFormSubmit} />
        <div className={styles.filters}>
          <FilterButton
            active={selectedCategory === null}
            onClick={() => handleFilterClick(null)}
          >
            Wszystkie
          </FilterButton>
          <FilterButton
            active={selectedCategory === "noun"}
            onClick={() => handleFilterClick("noun")}
          >
            Rzeczowniki
          </FilterButton>
          <FilterButton
            active={selectedCategory === "verb"}
            onClick={() => handleFilterClick("verb")}
          >
            Czasowniki
          </FilterButton>
        </div>
        <List data={filteredData} onDeleteItem={handleDeleteItem}></List>
      </section>
    </>
  );
}
