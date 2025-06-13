export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <h3 className="mb-2 font-semibold text-[var(--pasuseva-green)] dark:text-[var(--pasuseva-yellow1)]">
        Pasu Seva Support
      </h3>
      <p className="mb-4 text-gray-700 text-theme-sm dark:text-gray-300">
        पशुपालकों के लिए सहायता, योजनाएं और आपातकालीन सेवाएं एक ही जगह पर。
      </p>
      <a
        href="/support/helpline"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-[var(--pasuseva-orange)] text-theme-sm hover:bg-[var(--pasuseva-green)] transition-colors"
      >
        हेल्पलाइन देखें
      </a>
    </div>
  );
}
