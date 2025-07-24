export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground mt-2">
          © {new Date().getFullYear()} GameVerse.
        </p>
      </div>
    </footer>
  );
}
