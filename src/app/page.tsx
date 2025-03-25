import ShoppingList from "./components/input";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-black text-4xl sm:text-5xl md:text-7xl lg:text-9xl p-4 sm:p-6 font-bold">
        Shopping tool
      </h1>
      <p className="text-center">A tool for managing your shopping and keeping things in budget</p>
      <p className="text-center">To add an item fill in the box and press add, if the isle is know it will be sorted and displayed.</p>
      <p className="text-center">To remove an item click on it</p>
      <p className="text-center">If the isle is unknown on removal you will be asked to add the isle, it will apear the next time you add the product.</p>
      <ShoppingList />

    </div>
  );
}
