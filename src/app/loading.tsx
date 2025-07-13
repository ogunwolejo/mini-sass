import "./loading.scss";

export default function Loading() {
  return (
    <div
      id="main_loader"
      className="w-full h-full bg-background flex flex-col justify-center items-center"
    >
      <section id="section_loader" className="">
        <h6 id="" className="font-semibold text-2xl lg:text-3xl text-gray700">
          Mini
        </h6>
        <div className="loader-bar bg-teal-400 size-24 rounded-full"></div>
      </section>
    </div>
  );
}
