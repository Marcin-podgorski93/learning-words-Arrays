import { List } from "../List/List";
import styles from "./Panel.module.css";
import { Form } from "../Form/Form";
import { FilterButton } from "../FilterButton/FilterButton";
import { useEffect, useState } from "react";

export function Panel() {
  const [data, setData] = useState([
    {
      id: 1,
      word: "kot",
      translation: "cat",
      category: "noun",
    },
    {
      id: 2,
      word: "pies",
      translation: "dog",
      category: "noun",
    },
    {
      id: 3,
      word: "skakać",
      translation: "jump",
      category: "verb",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Odczytaj dane z localStorage podczas inicjalizacji komponentu
  useEffect(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Zapisz dane do localStorage za każdym razem, gdy `data` się zmieni
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

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
