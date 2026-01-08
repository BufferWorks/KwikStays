export default function AboutSection({ description }) {
  return (
    <section className="my-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">About this property</h2>
      <p className="text-gray-700 text-[15px] leading-relaxed max-w-3xl">{description}</p>
    </section>
  );
}
