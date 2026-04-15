import { useState, useEffect, useCallback } from 'react'
import logo from './assets/logo.png'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fade-in animations with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Form submit
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setFormStatus('sent')
    setTimeout(() => {
      setFormStatus('idle')
      e.target.reset()
    }, 3000)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* NAVBAR */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#inicio" className="logo-nav">
          <img src={logo} alt="ALSSE Logo" />
          <div className="logo-text">
            ALSSE<span>Logística &amp; Transporte</span>
          </div>
        </a>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li><a href="#inicio" onClick={closeMenu}>Inicio</a></li>
          <li><a href="#nosotros" onClick={closeMenu}>Nosotros</a></li>
          <li><a href="#servicios" onClick={closeMenu}>Servicios</a></li>
          <li><a href="#contacto" className="nav-cta" onClick={closeMenu}>Contacto</a></li>
        </ul>
        <button className="hamburger" aria-label="Menú" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-bg"></div>
        <div className="hero-grid-pattern"></div>
        <div className="hero-road"></div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">Logística &amp; Transporte de confianza</div>
            <h1>Tu carga llega <em>segura</em> y a <em>tiempo</em></h1>
            <p>
              Desde una camioneta hasta tráileres de carga pesada. En ALSSE tenemos
              la flotilla ideal para mover tu mercancía con la puntualidad que necesitas.
            </p>
            <div className="hero-buttons">
              <a href="#contacto" className="btn-primary">Solicitar cotización →</a>
              <a href="#servicios" className="btn-outline">Nuestros servicios</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-logo-display">
              <img src={logo} alt="ALSSE Logística & Transporte" />
            </div>
            <div className="hero-stats-row">
              <div className="mini-stat">
                <div className="mini-stat-num">99%</div>
                <div className="mini-stat-label">Entregas a tiempo</div>
              </div>
              <div className="mini-stat">
                <div className="mini-stat-num">24/7</div>
                <div className="mini-stat-label">Disponibilidad</div>
              </div>
              <div className="mini-stat">
                <div className="mini-stat-num">100%</div>
                <div className="mini-stat-label">Compromiso</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros">
        <div className="about-grid">
          <div className="about-visual fade-in">
            <div className="about-card-stack">
              <div className="mv-card">
                <div className="mv-card-tag">Nuestra Misión</div>
                <h3>Transporte confiable, tiempos cumplidos</h3>
                <p>
                  Brindar transporte confiable y cumplir con los tiempos acordados.
                  Cada envío es un compromiso que honramos con responsabilidad y profesionalismo.
                </p>
              </div>
              <div className="mv-card">
                <div className="mv-card-tag">Nuestra Visión</div>
                <h3>Líderes en logística nacional</h3>
                <p>
                  Liderar el sector logístico y expandirnos a nivel nacional, llevando
                  nuestro servicio de calidad a cada rincón del país.
                </p>
              </div>
            </div>
          </div>
          <div className="about-text fade-in">
            <span className="section-tag">¿Quiénes somos?</span>
            <h2>ALSSE LOGÍSTICA &amp; TRANSPORTE</h2>
            <p>
              Somos una empresa dedicada al transporte de mercancías con un enfoque claro:{' '}
              <strong style={{ color: 'var(--deep)' }}>cumplir con lo prometido</strong>.
              Nuestra operación se respalda con una flotilla versátil que se adapta a las
              necesidades de cada cliente.
            </p>
            <p>
              Desde cargas ligeras hasta contenedores y cargas sobredimensionadas, contamos
              con la capacidad y experiencia para mover tu mercancía de forma eficiente y segura.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">🎯</div>
                <strong>Puntualidad garantizada</strong>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🛡️</div>
                <strong>Carga asegurada</strong>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🚛</div>
                <strong>Flotilla diversa</strong>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">📞</div>
                <strong>Atención personalizada</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOTILLA */}
      <div className="fleet-strip">
        <div className="section-header fade-in">
          <span className="section-tag">Nuestra flotilla</span>
          <h2>Del paquete al contenedor</h2>
          <p>
            Contamos con unidades para cada tipo de carga, desde envíos ligeros
            hasta transporte pesado especializado.
          </p>
        </div>
        <div className="fleet-track">
          {[
            { emoji: '🚐', name: 'Camionetas', desc: 'Cargas ligeras y express' },
            { emoji: '🚚', name: 'Rabón', desc: 'Distribución urbana' },
            { emoji: '🚛', name: 'Torton', desc: 'Carga media y consolidada' },
            { emoji: '🏗️', name: 'Tráiler', desc: 'Carga completa y pesada' },
            { emoji: '📦', name: 'Portacontenedor', desc: 'Arrastre de contenedores' },
          ].map((item) => (
            <div className="fleet-item fade-in" key={item.name}>
              <div className="fleet-emoji">{item.emoji}</div>
              <h4>{item.name}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICIOS */}
      <section id="servicios">
        <div className="section-header fade-in">
          <span className="section-tag">Servicios</span>
          <h2>SOLUCIONES PARA CADA NECESIDAD</h2>
          <p>
            Nuestros servicios están diseñados para cubrir todo tipo de requerimiento
            logístico con eficiencia y seguridad.
          </p>
        </div>
        <div className="services-grid">
          {[
            { icon: '🎯', title: 'SERVICIO DIRECTO', desc: 'Tu carga viaja sin escalas desde el punto de origen hasta el destino final. Máxima rapidez y mínima manipulación para entregas urgentes y prioritarias.' },
            { icon: '📦', title: 'CARGA CONSOLIDADA', desc: 'Optimiza costos compartiendo espacio en nuestras unidades. Ideal para envíos que no requieren un vehículo completo, manteniendo la eficiencia y seguridad.' },
            { icon: '🏗️', title: 'ARRASTRE DE CONTENEDORES', desc: 'Servicio especializado de arrastre de contenedores desde puertos y terminales. Conexión directa entre transporte marítimo y terrestre para tu operación.' },
            { icon: '⚙️', title: 'CARGAS ESPECIALES', desc: 'Transporte de mercancías que requieren manejo especial. Planificación de ruta, permisos y equipamiento adecuado para cada carga fuera de lo convencional.' },
            { icon: '📐', title: 'CARGAS SOBREDIMENSIONADAS', desc: 'Maquinaria pesada, estructuras metálicas y piezas de gran tamaño. Contamos con la experiencia y permisos necesarios para moverlas de forma segura.' },
            { icon: '📋', title: 'LOGÍSTICA PERSONALIZADA', desc: 'Diseñamos soluciones a medida para tu operación. Analizamos tus necesidades y creamos un plan logístico que optimice tiempos, costos y recursos.' },
          ].map((svc) => (
            <div className="service-card fade-in" key={svc.title}>
              <div className="service-icon"><span>{svc.icon}</span></div>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto">
        <div className="section-header fade-in">
          <span className="section-tag">Contacto</span>
          <h2>HABLEMOS DE TU ENVÍO</h2>
          <p>Cuéntanos qué necesitas transportar y te ofrecemos la mejor solución al mejor precio.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info fade-in">
            <h3>ESTAMOS PARA SERVIRTE</h3>
            <p>
              Contáctanos y con gusto te atendemos. Nuestro equipo está listo para
              brindarte una cotización a la medida de tus necesidades.
            </p>
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div>
                <h4>Dirección</h4>
                <p>Lázaro Cárdenas, Michoacán<br />México</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📞</div>
              <div>
                <h4>Teléfono</h4>
                <p>+52 (753) 103 33 45</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">✉️</div>            
              <div>
                <h4>Email</h4>
                <p>comercial@alsselogistic.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">🕐</div>
              <div>
                <h4>Horario</h4>
                <p>Lunes a Viernes: 8:00 - 18:00<br />Sábados: 9:00 - 14:00</p>
              </div>
            </div>
          </div>
          <div className="contact-form-card fade-in">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" placeholder="Tu nombre completo" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="tu@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input type="tel" id="telefono" placeholder="+52 (753) 000 0000" />
              </div>
              <div className="form-group">
                <label htmlFor="servicio">Servicio de interés</label>
                <select id="servicio" defaultValue="">
                  <option value="">Selecciona un servicio</option>
                  <option>Servicio directo</option>
                  <option>Carga consolidada</option>
                  <option>Arrastre de contenedores</option>
                  <option>Cargas especiales</option>
                  <option>Cargas sobredimensionadas</option>
                  <option>Logística personalizada</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  placeholder="Cuéntanos sobre tu carga: origen, destino, tipo de mercancía, dimensiones..."
                  required
                />
              </div>
              <button
                type="submit"
                className="form-submit"
                style={formStatus === 'sent' ? { background: '#27ae60' } : {}}
              >
                {formStatus === 'sent' ? '✓ Mensaje enviado' : 'Enviar mensaje →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-area">
              <img src={logo} alt="ALSSE" />
              <div className="footer-logo-text">ALSSE</div>
            </div>
            <p>Logística y transporte de confianza. Tu carga es nuestra prioridad, siempre a tiempo, siempre segura.</p>
          </div>
          <div className="footer-col">
            <h4>NAVEGACIÓN</h4>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>SERVICIOS</h4>
            <ul>
              <li><a href="#servicios">Servicio directo</a></li>
              <li><a href="#servicios">Carga consolidada</a></li>
              <li><a href="#servicios">Arrastre de contenedores</a></li>
              <li><a href="#servicios">Cargas especiales</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 ALSSE Logística &amp; Transporte. Todos los derechos reservados.
        </div>
      </footer>
    </>
  )
}

export default App