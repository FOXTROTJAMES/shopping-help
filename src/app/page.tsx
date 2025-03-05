import ShoppingList from "./components/input";

export default function Home() {
  return (
    <div>
      <h1 class="text-center text-black text-4xl sm:text-5xl md:text-7xl lg:text-9xl p-4 sm:p-6 font-bold">
        Shopping tool
      </h1>

      <ShoppingList />

    </div>
  );
}
