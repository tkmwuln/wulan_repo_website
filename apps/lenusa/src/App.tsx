import { useEffect, useRef, useState } from "react"

const asset = (name: string) => `/assets/${name}`

const menuItems = [
  [
    "ae5ea.png",
    "Ikan Jimbaran Bali",
    "Marinated grilled fish with Jimbaran spiced base served with sambal",
  ],
  [
    "46ebd.png",
    "Nasi Goreng Kampung Sayur Banten",
    "Marinated grilled fish with Jimbaran spiced base served with sambal",
  ],
  [
    "9f7cf.png",
    "Sate Tempeh Jawa Timur",
    "Marinated grilled fish with Jimbaran spiced base served with sambal",
  ],
  [
    "f78e6.png",
    "Soto Daging Banten",
    "Marinated grilled fish with Jimbaran spiced base served with sambal",
  ],
  [
    "b995a.png",
    "Pisang Goreng",
    "Spiced grilled marinated tempeh skewer served with peanut sauce",
  ],
  [
    "2052b.png",
    "Urap Jawa",
    "Javanese salad with mixed vegetables and grated coconut, seasoned with herbs and traditional spices",
  ],
]

const storyItems = [
  ["9c212.png", "Dive into a sensorial experience"],
  ["87293.png", "An invitation to savor flavors and traditions"],
  ["b45ca.png", "Batik patterns adorn the walls"],
  ["f5cb5.png", "The vibrant tapestry of Indonesian culture"],
  ["d13b4.png", "Dive into a sensorial experience"],
]

const menuPages = [
  ["b3b5b.png", "Menu page 1"],
  ["5689c.png", "Menu page 2"],
  ["f78e6.png", "Menu page 3"],
  ["2052b.png", "Menu page 4"],
  ["e9977.png", "Menu page 5"],
]

type ModalName = "menu" | "story" | "reservation" | null

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

function Wordmark({ footer = false }: { footer?: boolean }) {
  if (footer) {
    return (
      <div className="footer-mark" aria-label="Le Nusa">
        <div className="footer-emblem">
          <img src={asset("228fa.svg")} alt="" />
          <img className="footer-eyes" src={asset("6d5d5.svg")} alt="" />
        </div>
        <img className="footer-name" src={asset("07200.svg")} alt="" />
        <img className="footer-rule" src={asset("b7ca6.svg")} alt="" />
        <img className="micro-mark" src={asset("f8ca3.svg")} alt="" />
        <img className="micro-path" src={asset("98654.svg")} alt="" />
      </div>
    )
  }

  return (
    <div className="hero-mark" aria-label="Le Nusa">
      <div className="hero-emblem">
        <img src={asset("50d4c.svg")} alt="" />
        <img className="hero-eyes" src={asset("7f5ff.svg")} alt="" />
      </div>
      <img className="hero-name" src={asset("321ab.svg")} alt="" />
      <img className="hero-rule" src={asset("e985a.svg")} alt="" />
      <img className="hero-dot" src={asset("812d0.svg")} alt="" />
    </div>
  )
}

function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span>
        <img src={asset("3cf12.svg")} alt="" />
        <img src={asset("d65d6.svg")} alt="" />
      </span>
      <img className="divider-line" src={asset("aab7a.svg")} alt="" />
      <span>
        <img src={asset("3cf12.svg")} alt="" />
        <img src={asset("d65d6.svg")} alt="" />
      </span>
      <img className="divider-line" src={asset("aab7a.svg")} alt="" />
      <span>
        <img src={asset("3cf12.svg")} alt="" />
        <img src={asset("d65d6.svg")} alt="" />
      </span>
      <img className="divider-speck" src={asset("cca3a.svg")} alt="" />
      <img className="divider-speck" src={asset("165b9.svg")} alt="" />
    </div>
  )
}

const navigation = [
  ["Home", "home"],
  ["Our Menu", "menu"],
  ["Food Story", "story"],
  ["Location", "location"],
  ["Our Contact", "contact"],
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const sections = [
      "home",
      "menu",
      "story",
      "reservation",
      "location",
      "contact",
    ]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle("menu-open", open)
    return () => document.body.classList.remove("menu-open")
  }, [open])

  const navigate = (id: string) => {
    setOpen(false)
    scrollTo(id)
  }

  return (
    <header className={`nav-shell ${open ? "is-open" : ""}`}>
      <div className="top-ribbon" aria-hidden="true">
        <img alt="" src="/assets/b593b.svg" />
      </div>
      <nav className="navbar" aria-label="Main navigation">
        <div className="nav-group">
          {navigation.slice(0, 3).map(([label, id]) => (
            <button
              className={active === id ? "active" : ""}
              key={id}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          className="nav-logo"
          onClick={() => navigate("home")}
          aria-label="Le Nusa home"
        >
          <span>
            <img src={asset("494fc.svg")} alt="" />
            <img className="nav-eyes" src={asset("d9d0b.svg")} alt="" />
          </span>
          <img src={asset("10500.svg")} alt="" />
        </button>
        <div className="nav-group nav-right">
          {navigation.slice(3).map(([label, id]) => (
            <button
              className={active === id ? "active" : ""}
              key={id}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          ))}
          <button
            className="pill small"
            onClick={() => navigate("reservation")}
          >
            Reservation
          </button>
        </div>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className="mobile-menu" id="mobile-navigation">
        {navigation.map(([label, id], index) => (
          <button
            className={active === id ? "active" : ""}
            style={{ "--item": index } as React.CSSProperties}
            key={id}
            onClick={() => navigate(id)}
          >
            <span>0{index + 1}</span>
            {label}
          </button>
        ))}
        <button
          className="mobile-reserve"
          style={{ "--item": navigation.length } as React.CSSProperties}
          onClick={() => navigate("reservation")}
        >
          Reserve a table
        </button>
      </div>
    </header>
  )
}

function App() {
  const menuRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const [modal, setModal] = useState<ModalName>(null)
  const [menuPage, setMenuPage] = useState(0)
  const move = (ref: React.RefObject<HTMLDivElement | null>, amount: number) =>
    ref.current?.scrollBy({ left: amount, behavior: "smooth" })

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]")
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle("modal-open", modal !== null)
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null)
      if (modal === "menu" && event.key === "ArrowRight") {
        setMenuPage((page) => (page + 1) % menuPages.length)
      }
      if (modal === "menu" && event.key === "ArrowLeft") {
        setMenuPage((page) => (page - 1 + menuPages.length) % menuPages.length)
      }
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.classList.remove("modal-open")
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [modal])

  const carouselKeys = (
    event: React.KeyboardEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement | null>,
    amount: number,
  ) => {
    if (event.key === "ArrowRight") move(ref, amount)
    if (event.key === "ArrowLeft") move(ref, -amount)
  }

  return (
    <main>
      <Navbar />

      {modal && (
        <div
          className="experience-modal"
          role="dialog"
          aria-modal="true"
          aria-label={
            modal === "menu"
              ? "Le Nusa menu"
              : modal === "story"
                ? "Le Nusa story"
                : "Reserve a table"
          }
        >
          <button
            className="modal-backdrop"
            onClick={() => setModal(null)}
            aria-label="Close"
          />
          <div className={`modal-panel ${modal}-panel`}>
            <div className="modal-toolbar">
              <span>
                {modal === "menu"
                  ? "Menu Lenusa"
                  : modal === "story"
                    ? "Our Story"
                    : "Reservation"}
              </span>
              <button onClick={() => setModal(null)} aria-label="Close dialog">
                <span />
                <span />
              </button>
            </div>

            {modal === "menu" && (
              <div className="menu-viewer">
                <aside>
                  {menuPages.map(([image, label], index) => (
                    <button
                      className={menuPage === index ? "active" : ""}
                      key={image}
                      onClick={() => setMenuPage(index)}
                      aria-label={`Show ${label}`}
                    >
                      <span>{index + 1}</span>
                      <img src={asset(image)} alt="" />
                    </button>
                  ))}
                </aside>
                <div className="menu-page">
                  <button
                    className="viewer-arrow previous"
                    onClick={() =>
                      setMenuPage(
                        (page) =>
                          (page - 1 + menuPages.length) % menuPages.length,
                      )
                    }
                    aria-label="Previous menu page"
                  >
                    ‹
                  </button>
                  <img
                    src={asset(menuPages[menuPage][0])}
                    alt={menuPages[menuPage][1]}
                  />
                  <button
                    className="viewer-arrow next"
                    onClick={() =>
                      setMenuPage((page) => (page + 1) % menuPages.length)
                    }
                    aria-label="Next menu page"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}

            {modal === "story" && (
              <article className="article-view">
                <img
                  className="article-hero"
                  src={asset("c244c.png")}
                  alt="Indonesian ceremonial headdress"
                />
                <div className="article-content">
                  <div className="article-tags">
                    <span>Blog</span>
                    <span>Story</span>
                  </div>
                  <h2>Dive into a sensorial experience</h2>
                  <p>
                    Yet, Le Nusa offers more than just exceptional food. It is a
                    sensorial experience that immerses you in the vibrant
                    tapestry of Indonesian culture. As you dine, your
                    surroundings are a testament to the country&apos;s artistic
                    heritage.
                  </p>
                  <p>
                    Batik patterns adorn the walls, weaves drape elegantly, and
                    the intricate beauty of suntiang and gebyok mesmerizes you.
                    Every detail is thoughtfully integrated into the interior,
                    creating a journey through Indonesia&apos;s culinary and
                    cultural treasures.
                  </p>
                  <div className="article-actions">
                    <span>Share the story</span>
                    <a
                      href="https://wa.me/?text=Discover%20Le%20Nusa%20Paris"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={asset("9d6bb.svg")} alt="" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            )}

            {modal === "reservation" && (
              <div className="booking-view">
                <div className="booking-hero">
                  <img src={asset("7f718.png")} alt="" />
                  <div>
                    <span>Bistronomie Indonésienne</span>
                    <h2>Le Nusa</h2>
                  </div>
                </div>
                <form
                  className="booking-form"
                  onSubmit={(event) => {
                    event.preventDefault()
                    window.location.href =
                      "mailto:lenusaparis@gmail.com?subject=Table reservation"
                  }}
                >
                  <label>
                    Guests
                    <select defaultValue="2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((guest) => (
                        <option key={guest} value={guest}>
                          {guest} {guest === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Date
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </label>
                  <label>
                    Time
                    <select defaultValue="19:00">
                      <option>12:00</option>
                      <option>12:30</option>
                      <option>13:00</option>
                      <option>19:00</option>
                      <option>19:30</option>
                      <option>20:00</option>
                      <option>20:30</option>
                    </select>
                  </label>
                  <button type="submit">Find a table</button>
                </form>
                <p className="booking-note">
                  Monday–Saturday · 12h–15h / 19h–22h
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <section className="hero" id="home">
        <img
          className="hero-photo"
          src={asset("01930.png")}
          alt="A table filled with Indonesian dishes"
        />
        <div className="hero-shade" />
        <Wordmark />
        <button
          className="scroll-arrow"
          onClick={() => scrollTo("intro")}
          aria-label="Scroll to introduction"
        >
          <img src={asset("01564.svg")} alt="" />
        </button>
      </section>

      <section className="intro patterned-corners" id="intro">
        <p data-reveal>
          Experience the epitome of Indonesian fine dining in Paris at Le Nusa,
          where culinary excellence meets cultural artistry. Nusa, which
          translates to “archipelago”, encapsulates the essence of this
          extraordinary dining establishment.
        </p>
        <Divider />
      </section>

      <section className="menu-section patterned-corners" id="menu">
        <div className="section-copy" data-reveal>
          <h2>Our Menu</h2>
          <p>The very best of Indonesia&apos;s culinary heritage</p>
          <button className="pill" onClick={() => setModal("menu")}>
            Discover Our Menu
          </button>
        </div>
        <div className="menu-wrap">
          <div
            className="menu-track"
            ref={menuRef}
            tabIndex={0}
            role="region"
            aria-label="Menu highlights carousel"
            onKeyDown={(event) => carouselKeys(event, menuRef, 430)}
          >
            {menuItems.map(([image, title, description]) => (
              <article className="menu-card" data-reveal key={title}>
                <img src={asset(image)} alt={title} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="carousel-controls">
            <button
              className="carousel-arrow previous"
              onClick={() => move(menuRef, -430)}
              aria-label="Previous menu item"
            />
            <img src={asset("ed3c3.svg")} alt="" />
            <button
              className="carousel-arrow next"
              onClick={() => move(menuRef, 430)}
              aria-label="Next menu item"
            />
          </div>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-top">
        <div className="batik" />
        <div className="story-feature" data-reveal>
          <h2>Our Food Story &amp; Experience</h2>
          <div className="story-feature-grid">
            <div className="story-photos">
              <img src={asset("9c212.png")} alt="Le Nusa dining room" />
              <img
                src={asset("e8654.png")}
                alt="A guest enjoying the Le Nusa experience"
              />
            </div>
            <div className="story-copy">
              <p>
                Yet, Le Nusa offers more than just exceptional food. It&apos;s a
                sensorial experience that immerses you in the vibrant tapestry
                of Indonesian culture. As you dine, your surroundings are a
                testament to the country&apos;s artistic heritage. Batik
                patterns adorn the walls, weaves drape elegantly, and the
                intricate beauty of suntiang and gebyok mesmerizes you, all
                elements thoughtfully integrated into the interior design.
              </p>
              <div>
                <img src={asset("eb1e5.png")} alt="" />
                <button className="pill" onClick={() => setModal("story")}>
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        <Divider />
        <div
          className="story-track"
          ref={storyRef}
          tabIndex={0}
          role="region"
          aria-label="Restaurant story carousel"
          onKeyDown={(event) => carouselKeys(event, storyRef, 320)}
        >
          {storyItems.map(([image, title]) => (
            <article className="story-card" key={`${image}-${title}`}>
              <img src={asset(image)} alt="" />
              <div>
                <h3>{title}</h3>
              </div>
              <button
                onClick={() => setModal("story")}
                aria-label={`Read ${title}`}
              >
                <img src={asset("67838.svg")} alt="" />
              </button>
              <img className="card-shape" src={asset("fa32d.svg")} alt="" />
              <img className="card-mask" src={asset("5c82e.svg")} alt="" />
            </article>
          ))}
        </div>
        <div className="story-mobile-controls">
          <button onClick={() => move(storyRef, -320)}>Previous</button>
          <button onClick={() => move(storyRef, 320)}>Next</button>
        </div>
      </section>

      <section className="reservation-section" id="reservation">
        <div className="reservation-content" data-reveal>
          <h2>Reservation</h2>
          <img alt="" src="/assets/e3586.png" />
          <p>
            Would you like to organize a group meal or privatize one of our
            spaces?
            <br />
            We would be delighted to welcome you!
          </p>
          <button className="pill" onClick={() => setModal("reservation")}>
            Reserve A Table
          </button>
        </div>
        <div className="pattern-strip" />
      </section>

      <section className="location-section" id="location">
        <h2 data-reveal>Our Location</h2>
        <p className="subtitle" data-reveal>
          Get direction of our restaurants
        </p>
        <div className="location-content">
          <aside className="location-card" data-reveal>
            <img src={asset("21b93.png")} alt="" />
            <h3>Hours &amp; Location</h3>
            <p>
              36 rue Fabert | 75007 Paris
              <br />
              lenusaparis@gmail.com
              <br />
              07 82 90 14 31
            </p>
            <h3>Open Daily</h3>
            <p>
              Monday-Saturday
              <br />
              12h 15h – 19h 22h
              <br />
              Sunday (Brunch Only)
              <br />
              11h30 – 14h30
            </p>
          </aside>
          <div className="map">
            <img
              className="map-art"
              src={asset("bf4be.svg")}
              alt="World map showing Le Nusa locations"
            />
            <a
              className="map-label paris"
              href="https://maps.google.com/?q=36+rue+Fabert+75007+Paris"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Paris location in Google Maps"
            >
              <img src={asset("ed462.svg")} alt="" />
              <span>
                PARIS<small>OPEN &nbsp; &gt;</small>
              </span>
            </a>
            <div className="map-label london">
              <img src={asset("ed462.svg")} alt="" />
              <span>
                LONDON<small>Coming SOON</small>
              </span>
            </div>
            <div className="map-label singapore">
              <img src={asset("ed462.svg")} alt="" />
              <span>
                SINGAPORE<small>Coming SOON</small>
              </span>
            </div>
            <div className="map-label jakarta">
              <img src={asset("ed462.svg")} alt="" />
              <span>
                JAKARTA<small>OPEN &nbsp; &gt;</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-banner" data-reveal>
          <h2>Our Contact</h2>
          <p>
            Let Le Nusa transport you to the heart
            <br />
            of Indonesia&apos;s culinary and cultural treasures.
          </p>
          <a
            className="pill dark"
            href="https://wa.me/33782901431"
            target="_blank"
            rel="noreferrer"
          >
            Contact
          </a>
        </div>
        <footer>
          <div className="footer-contact">
            <h3>Contact</h3>
            <p>
              36 rue Fabert | 75007 Paris
              <br />
              lenusaparis@gmail.com
              <br />
              07 82 90 14 31
            </p>
            <h3>Open Hours</h3>
            <p>
              Monday-Saturday
              <br />
              12h 15h – 19h 22h
              <br />
              Sunday (Brunch Only)
              <br />
              11h30 – 14h30
            </p>
          </div>
          <Wordmark footer />
          <div className="footer-links">
            {[
              ["Home", "home"],
              ["Our Menu", "menu"],
              ["Food Story", "story"],
              ["Our Location", "location"],
              ["Our Contact", "contact"],
              ["Reservation", "reservation"],
            ].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </div>
        </footer>
        <div className="legal">
          <span>Release © 2024</span>
          <span>Privacy Policy</span>
        </div>
      </section>
    </main>
  )
}

export default App
