import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from "lucide-react";
import { duas, duaCategories } from "@/data/islamic-data";

export default function DuasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("dua-bookmarks");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem("dua-bookmarks", JSON.stringify([...next]));
      return next;
    });
  };

  const filtered = duas.filter((d) => {
    const matchCat = selectedCategory === "All" || d.category === selectedCategory;
    const matchSearch =
      !search ||
      d.translation.toLowerCase().includes(search.toLowerCase()) ||
      d.transliteration.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="px-4 pt-6 pb-4 space-y-4 animate-fade-in">
      <h1 className="font-arabic text-xl text-foreground">Dua Library</h1>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search duas..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {["All", ...duaCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${cat === selectedCategory
              ? "primary-gradient text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Duas List */}
      <div className="space-y-3">
        {filtered.map((dua, i) => (
          <motion.div
            key={dua.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="islamic-card overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === dua.id ? null : dua.id)}
              className="w-full p-4 text-left flex items-start justify-between gap-2"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs text-accent font-medium">{dua.category}</p>
                <p className="text-sm text-foreground mt-1 line-clamp-2">{dua.translation}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(dua.id);
                  }}
                  className="p-1"
                >
                  {bookmarks.has(dua.id) ? (
                    <BookmarkCheck size={16} className="text-accent" />
                  ) : (
                    <Bookmark size={16} className="text-muted-foreground" />
                  )}
                </button>
                {expandedId === dua.id ? (
                  <ChevronUp size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={16} className="text-muted-foreground" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {expandedId === dua.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                    <p className="text-right text-xl font-arabic leading-loose text-foreground">{dua.arabic}</p>
                    <p className="text-sm italic text-primary">{dua.transliteration}</p>
                    <p className="text-sm text-foreground/80">{dua.translation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
