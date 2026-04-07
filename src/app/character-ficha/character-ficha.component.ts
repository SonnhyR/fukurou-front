import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';

interface Genre {
  id: string;
  name: string;
  icon: string;
  color: string;
  subgenres: Subgenre[];
}

interface Subgenre {
  id: string;
  name: string;
  icon: string;
}

interface StepInfo {
  title: string;
  description: string;
  icon?: string;
}

@Component({
  selector: 'app-character-ficha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-ficha.component.html',
  styleUrls: ['./character-ficha.component.css']
})
export class CharacterFicha {
  // Estado del quiz
  currentStep: number = 0;
  totalSteps: number = 9;
  currentDate = new Date();
  
  pdfPreviewUrl: SafeResourceUrl | null = null;
  private sanitizer = inject(DomSanitizer);

  // Datos del personaje
  characterData: any = {
    obra: {
      titulo: '',
      genero: '',
      subgenero: ''
    },
    basico: {
      nombre: '',
      edad: '',
      genero: '',
      rol: ''
    },
    apariencia: {
      altura: '',
      complexion: '',
      ojos: '',
      cabello: '',
      rasgos: '',
      estilo: ''
    },
    personalidad: {
      tipo: '',
      virtudes: '',
      defectos: '',
      miedos: '',
      motivacion: ''
    },
    historia: {
      origen: '',
      eventoClave: '',
      relaciones: '',
      secretos: ''
    },
    habilidades: {
      naturales: '',
      aprendidas: '',
      especiales: '',
      limitaciones: ''
    },
    relaciones: {
      aliados: '',
      enemigos: '',
      romance: '',
      familia: ''
    },
    especifico: {
      tipoSer: '',
      origenMagico: '',
      tipoRomance: '',
      contextoSocial: '',
      nivelImplantes: '',
      corporacion: ''
    }
  };

  // Array sincronizado de pasos
  steps: StepInfo[] = [
    { 
      title: '¡Bienvenida/o a la creación de personajes!',
      description: 'En esta sección podrás construir la ficha de tu personaje personalizando sus características. ¿Estás lista/o?',
      icon: '🦉'
    },
    { 
      title: '📖 Sobre tu obra',
      description: 'Comencemos por los datos generales de tu historia',
      icon: '📖'
    },
    { 
      title: '👤 Datos básicos del personaje',
      description: 'Lo esencial: ¿quién es este personaje?',
      icon: '👤'
    },
    { 
      title: '🎭 Preguntas específicas del género',
      description: 'Detalles específicos del género que elegiste',
      icon: '🎭'
    },
    { 
      title: '👁️ Apariencia física',
      description: '¿Cómo se ve físicamente?',
      icon: '👁️'
    },
    { 
      title: '🧠 Personalidad',
      description: '¿Cómo piensa y siente?',
      icon: '🧠'
    },
    { 
      title: '📜 Historia de fondo',
      description: '¿De dónde viene y qué lo ha marcado?',
      icon: '📜'
    },
    { 
      title: '⚡ Habilidades y poderes',
      description: '¿Qué sabe hacer? ¿Tiene habilidades especiales?',
      icon: '⚡'
    },
    { 
      title: '🤝 Relaciones',
      description: '¿Quiénes son las personas importantes en su vida?',
      icon: '🤝'
    },
    { 
      title: '🎉 ¡Ficha completada!',
      description: '¡Excelente! Tu personaje está listo. Revisa la ficha y descárgala.',
      icon: '🎉'
    }
  ];

  // Géneros principales
  genres: Genre[] = [
    {
      id: 'fantasia',
      name: 'Fantasía',
      icon: '⚔️',
      color: '#8B4513',
      subgenres: [
        { id: 'alta-fantasia', name: 'Alta Fantasía', icon: '🏰' },
        { id: 'fantasia-urbana', name: 'Fantasía Urbana', icon: '🌆' },
        { id: 'fantasia-oscura', name: 'Fantasía Oscura', icon: '🌑' },
        { id: 'romantasy', name: 'Romantasy', icon: '💖' },
        { id: 'fantasia-historica', name: 'Fantasía Histórica', icon: '🏛️' }
      ]
    },
    {
      id: 'sci-fi',
      name: 'Ciencia Ficción',
      icon: '🚀',
      color: '#1E90FF',
      subgenres: [
        { id: 'cyberpunk', name: 'Cyberpunk', icon: '💻' },
        { id: 'space-opera', name: 'Space Opera', icon: '🌌' },
        { id: 'post-apocaliptico', name: 'Post-apocalíptico', icon: '☢️' },
        { id: 'sci-fi-militar', name: 'Sci-Fi Militar', icon: '⚔️' },
        { id: 'sci-fi-blanda', name: 'Sci-Fi Blanda', icon: '🧬' }
      ]
    },
    {
      id: 'romance',
      name: 'Romance',
      icon: '💕',
      color: '#FF69B4',
      subgenres: [
        { id: 'contemporaneo', name: 'Contemporáneo', icon: '📱' },
        { id: 'historico', name: 'Histórico', icon: '🎩' },
        { id: 'paranormal', name: 'Paranormal', icon: '👻' },
        { id: 'dark-romance', name: 'Dark Romance', icon: '🖤' },
        { id: 'lgbtq', name: 'LGBTQ+', icon: '🌈' }
      ]
    },
    {
      id: 'misterio',
      name: 'Misterio',
      icon: '🔍',
      color: '#2F4F4F',
      subgenres: [
        { id: 'thriller-psicologico', name: 'Thriller Psicológico', icon: '🧠' },
        { id: 'misterio-policial', name: 'Misterio Policial', icon: '👮' },
        { id: 'suspenso', name: 'Suspenso', icon: '😰' },
        { id: 'noir', name: 'Noir', icon: '🎩' }
      ]
    },
    {
      id: 'horror',
      name: 'Horror',
      icon: '👻',
      color: '#8B0000',
      subgenres: [
        { id: 'horror-psicologico', name: 'Horror Psicológico', icon: '🌀' },
        { id: 'horror-sobrenatural', name: 'Horror Sobrenatural', icon: '👁️' },
        { id: 'gore', name: 'Gore/Splatter', icon: '🔪' },
        { id: 'horror-cosmico', name: 'Horror Cósmico', icon: '🌠' }
      ]
    }
  ];

  // Tipos de razas para fantasía
  fantasyRaceTypes = [
    { id: 'humano', name: 'Humano', icon: '👤' },
    { id: 'vampiro', name: 'Vampiro', icon: '🧛' },
    { id: 'hombre-lobo', name: 'Hombre Lobo', icon: '🐺' },
    { id: 'elfo', name: 'Elfo', icon: '🧝' },
    { id: 'hada', name: 'Hada', icon: '🧚' },
    { id: 'orco', name: 'Orco', icon: '👹' },
    { id: 'dragon', name: 'Dragón/Dracónido', icon: '🐉' },
    { id: 'mezcla', name: 'Mezcla/Híbrido', icon: '🔀' },
    { id: 'otro', name: 'Otra criatura', icon: '❓' }
  ];

  // Contextos sociales
  socialContexts = [
    { id: 'realeza', name: 'Realeza/Nobleza', icon: '👑' },
    { id: 'plebeyos', name: 'Pueblo llano', icon: '👨‍🌾' },
    { id: 'marginados', name: 'Marginados', icon: '🚫' },
    { id: 'guerreros', name: 'Guerreros/Mercenarios', icon: '⚔️' },
    { id: 'magos', name: 'Magos/Hechiceros', icon: '🔮' },
    { id: 'comerciantes', name: 'Comerciantes', icon: '💰' }
  ];

  // Corporaciones para cyberpunk
  corporations = [
    { id: 'megacorp', name: 'Megacorporación', icon: '🏢' },
    { id: 'gobierno', name: 'Gobierno', icon: '🏛️' },
    { id: 'mafia', name: 'Sindicato/Mafia', icon: '🕶️' },
    { id: 'independiente', name: 'Independiente/Freelancer', icon: '💻' },
    { id: 'rebelde', name: 'Rebelde', icon: '⚡' },
    { id: 'ninguna', name: 'Sin afiliación', icon: '🚫' }
  ];

  // MÉTODOS PRINCIPALES

  startQuiz(): void {
    this.currentStep = 1;
  }

  nextStep(): void {
    // Validar paso actual antes de avanzar
    if (this.canProceed()) {
      if (this.currentStep < 9) {
        this.currentStep++;
        if (this.currentStep === 9) {
           this.generatePDFPreview();
        }
      } else {
        this.currentStep = 9; // Vista previa
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= 9) {
      this.currentStep = step;
    }
  }

  selectGenre(genreId: string): void {
    this.characterData.obra.genero = genreId;
    this.characterData.obra.subgenero = '';
    this.characterData.especifico = {}; // Resetear datos específicos
  }

  selectSubgenre(subgenreId: string): void {
    this.characterData.obra.subgenero = subgenreId;
  }

  // MÉTODOS DE VALIDACIÓN

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.characterData.obra.titulo.trim() !== '' && 
               this.characterData.obra.genero !== '' && 
               this.characterData.obra.subgenero !== '';
      case 2:
        return this.characterData.basico.nombre.trim() !== '';
      default:
        return true;
    }
  }

  // MÉTODOS DE OBTENCIÓN DE DATOS

  getCurrentStepTitle(): string {
    return this.steps[this.currentStep]?.title || 'Título no disponible';
  }

  getCurrentStepDescription(): string {
    return this.steps[this.currentStep]?.description || 'Descripción no disponible';
  }

  getCurrentStepIcon(): string {
    return this.steps[this.currentStep]?.icon || '📝';
  }

  getProgressPercentage(): number {
    return (this.currentStep / 8) * 100;
  }

  getCurrentSubgenres(): Subgenre[] {
    const genre = this.genres.find(g => g.id === this.characterData.obra.genero);
    return genre ? genre.subgenres : [];
  }

  // MÉTODOS DE PREGUNTAS ESPECÍFICAS

  hasGenreSpecificQuestions(): boolean {
    const { genero, subgenero } = this.characterData.obra;
    
    if (!genero || !subgenero) return false;
    
    // Definir qué combinaciones tienen preguntas específicas
    const hasQuestions = [
      'fantasia-romantasy',
      'sci-fi-cyberpunk',
      'romance-paranormal',
      'horror-sobrenatural'
    ];
    
    return hasQuestions.includes(`${genero}-${subgenero}`);
  }

  getRaceTypeName(raceId: string): string {
    const race = this.fantasyRaceTypes.find(r => r.id === raceId);
    return race ? race.name : 'No especificado';
  }

  // MÉTODOS DE FORMATO

  formatGenre(genreId: string): string {
    const genre = this.genres.find(g => g.id === genreId);
    return genre ? genre.name : 'No especificado';
  }

  formatSubgenre(subgenreId: string): string {
    if (!this.characterData.obra.genero || !subgenreId) return '';
    
    const genre = this.genres.find(g => g.id === this.characterData.obra.genero);
    if (!genre) return '';
    
    const subgenre = genre.subgenres.find(s => s.id === subgenreId);
    return subgenre ? subgenre.name : '';
  }

  formatGender(genderId: string): string {
    const genders: {[key: string]: string} = {
      'masculino': 'Masculino',
      'femenino': 'Femenino',
      'no-binario': 'No binario',
      'genderfluid': 'Genderfluid',
      'agenero': 'Agénero',
      'otro': 'Otro'
    };
    return genders[genderId] || 'No especificado';
  }

  // MÉTODOS DE ACCIÓN FINAL

  downloadPDF(): void {
    const doc = this.buildPDFDoc();
    const safeName = (this.characterData.basico.nombre || 'personaje')
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúñü\s]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
    const fileName = `ficha-${safeName}-${Date.now()}.pdf`;
    doc.save(fileName);
  }

  generatePDFPreview(): void {
    const doc = this.buildPDFDoc();
    const pdfDataUri = doc.output('datauristring');
    this.pdfPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfDataUri);
  }

  private buildPDFDoc(): jsPDF {
    // Crear documento PDF
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let y = margin;

    // Configurar fuente y colores
    doc.setFont('helvetica');
    doc.setFontSize(16);
    doc.setTextColor(93, 64, 55); // #5D4037

    // Título principal
    doc.text('FICHA DE PERSONAJE - FUKURO', pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Línea decorativa
    doc.setDrawColor(255, 152, 0); // Naranja
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Información de la obra
    doc.setFontSize(12);
    doc.setTextColor(121, 85, 72); // #795548
    doc.text(`Obra: ${this.characterData.obra.titulo || 'Sin título'}`, margin, y);
    y += 7;
    doc.text(`Género: ${this.formatGenre(this.characterData.obra.genero)}`, margin, y);
    y += 7;
    doc.text(`Subgénero: ${this.formatSubgenre(this.characterData.obra.subgenero)}`, margin, y);
    y += 15;

    // Función para agregar sección
    const addSection = (title: string, content: Array<{label: string, value: string}>) => {
      // Verificar si necesitamos nueva página
      if (y > pageHeight - 40) {
        doc.addPage();
        y = margin;
      }

      // Título de sección
      doc.setFontSize(14);
      doc.setTextColor(139, 69, 19); // #8B4513
      doc.text(title, margin, y);
      y += 8;

      // Línea de sección
      doc.setDrawColor(255, 235, 215); // #FFEBD7
      doc.setLineWidth(0.5);
      doc.line(margin, y, margin + 50, y);
      y += 5;

      // Contenido
      doc.setFontSize(11);
      doc.setTextColor(66, 66, 66); // Gris oscuro
      
      content.forEach(item => {
        if (item.value && item.value.trim() !== '') {
          // Verificar si necesitamos nueva página para este item
          if (y > pageHeight - 20) {
            doc.addPage();
            y = margin;
          }
          
          // Texto con etiqueta en negrita
          doc.setFont('helvetica', 'bold');
          doc.text(`${item.label}: `, margin, y);
          
          // Valor
          const textWidth = doc.getTextWidth(`${item.label}: `);
          doc.setFont('helvetica', 'normal');
          
          // Si el texto es muy largo, lo dividimos en múltiples líneas
          const maxWidth = pageWidth - margin * 2 - textWidth;
          const lines = doc.splitTextToSize(item.value, maxWidth);
          
          if (lines.length > 1) {
            doc.text(lines[0], margin + textWidth, y);
            y += 7;
            
            for (let i = 1; i < lines.length; i++) {
              if (y > pageHeight - 20) {
                doc.addPage();
                y = margin;
              }
              doc.text(lines[i], margin + 10, y);
              y += 7;
            }
          } else {
            doc.text(item.value, margin + textWidth, y);
            y += 7;
          }
        }
      });
      
      y += 10; // Espacio entre secciones
    };

    // DATOS BÁSICOS
    addSection('DATOS BÁSICOS', [
      { label: 'Nombre', value: this.characterData.basico.nombre || '' },
      { label: 'Edad', value: this.characterData.basico.edad?.toString() || '' },
      { label: 'Género', value: this.formatGender(this.characterData.basico.genero) },
      { label: 'Rol', value: this.characterData.basico.rol || '' }
    ]);

    // APARIENCIA
    addSection('APARIENCIA', [
      { label: 'Altura', value: this.characterData.apariencia.altura ? `${this.characterData.apariencia.altura} cm` : '' },
      { label: 'Complexión', value: this.characterData.apariencia.complexion || '' },
      { label: 'Ojos', value: this.characterData.apariencia.ojos || '' },
      { label: 'Cabello', value: this.characterData.apariencia.cabello || '' },
      { label: 'Rasgos distintivos', value: this.characterData.apariencia.rasgos || '' },
      { label: 'Estilo', value: this.characterData.apariencia.estilo || '' }
    ]);

    // PERSONALIDAD
    addSection('PERSONALIDAD', [
      { label: 'Tipo', value: this.characterData.personalidad.tipo || '' },
      { label: 'Virtudes', value: this.characterData.personalidad.virtudes || '' },
      { label: 'Defectos', value: this.characterData.personalidad.defectos || '' },
      { label: 'Miedos', value: this.characterData.personalidad.miedos || '' },
      { label: 'Motivación', value: this.characterData.personalidad.motivacion || '' }
    ]);

    // ESPECÍFICOS DEL GÉNERO (si existen)
    const especificoContent = [];
    if (this.characterData.especifico.tipoSer) {
      especificoContent.push({ 
        label: 'Tipo de ser', 
        value: this.getRaceTypeName(this.characterData.especifico.tipoSer) 
      });
    }
    if (this.characterData.especifico.origenMagico) {
      especificoContent.push({ 
        label: 'Origen mágico', 
        value: this.characterData.especifico.origenMagico 
      });
    }
    if (this.characterData.especifico.tipoRomance) {
      especificoContent.push({ 
        label: 'Tipo de romance', 
        value: this.characterData.especifico.tipoRomance 
      });
    }
    if (this.characterData.especifico.nivelImplantes) {
      especificoContent.push({ 
        label: 'Nivel de implantes', 
        value: this.characterData.especifico.nivelImplantes 
      });
    }
    if (this.characterData.especifico.corporacion) {
      especificoContent.push({ 
        label: 'Corporación', 
        value: this.characterData.especifico.corporacion 
      });
    }
    
    if (especificoContent.length > 0) {
      addSection('ESPECÍFICOS DEL GÉNERO', especificoContent);
    }

    // HISTORIA
    addSection('HISTORIA', [
      { label: 'Origen', value: this.characterData.historia.origen || '' },
      { label: 'Evento clave', value: this.characterData.historia.eventoClave || '' },
      { label: 'Relaciones familiares', value: this.characterData.historia.relaciones || '' },
      { label: 'Secretos', value: this.characterData.historia.secretos || '' }
    ]);

    // HABILIDADES
    addSection('HABILIDADES', [
      { label: 'Naturales', value: this.characterData.habilidades.naturales || '' },
      { label: 'Aprendidas', value: this.characterData.habilidades.aprendidas || '' },
      { label: 'Especiales', value: this.characterData.habilidades.especiales || '' },
      { label: 'Limitaciones', value: this.characterData.habilidades.limitaciones || '' }
    ]);

    // RELACIONES
    addSection('RELACIONES', [
      { label: 'Aliados', value: this.characterData.relaciones.aliados || '' },
      { label: 'Enemigos', value: this.characterData.relaciones.enemigos || '' },
      { label: 'Romance', value: this.characterData.relaciones.romance || '' },
      { label: 'Familia', value: this.characterData.relaciones.familia || '' }
    ]);

    // Pie de página en todas las páginas
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Línea separadora en el pie
      doc.setDrawColor(255, 152, 0);
      doc.setLineWidth(0.5);
      doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
      
      // Texto del pie
      doc.setFontSize(8);
      doc.setTextColor(139, 111, 85); // #8B7355
      doc.text(
        `Creado con FUKURO • ${this.currentDate.toLocaleDateString('es-ES')} • Página ${i} de ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
      
    }

    return doc;
  }

  shareFicha(): void {
    const shareText = `¡Acabo de crear la ficha de ${this.characterData.basico.nombre || 'mi personaje'} en Fukurō!`;
    
    if (navigator.share) {
      navigator.share({
        title: `Ficha de ${this.characterData.basico.nombre}`,
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(shareText);
      alert('¡Texto copiado al portapapeles! Compártelo donde quieras.');
    }
  }

  resetQuiz(): void {
    if (confirm('¿Estás seguro de que quieres crear una nueva ficha? Se perderán los datos actuales.')) {
      this.currentStep = 0;
      this.characterData = {
        obra: { titulo: '', genero: '', subgenero: '' },
        basico: { nombre: '', edad: '', genero: '', rol: '' },
        apariencia: { altura: '', complexion: '', ojos: '', cabello: '', rasgos: '', estilo: '' },
        personalidad: { tipo: '', virtudes: '', defectos: '', miedos: '', motivacion: '' },
        historia: { origen: '', eventoClave: '', relaciones: '', secretos: '' },
        habilidades: { naturales: '', aprendidas: '', especiales: '', limitaciones: '' },
        relaciones: { aliados: '', enemigos: '', romance: '', familia: '' },
        especifico: {}
      };
    }
  }
}