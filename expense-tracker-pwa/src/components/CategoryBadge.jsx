const categoryStyles = {
  Alimentación: 'food',
  Transporte: 'transport',
  Servicios: 'services',
  Salud: 'health',
  Ocio: 'leisure',
  Educación: 'education',
  General: 'default'
};

export function CategoryBadge({ category = 'General' }) {
  const tone = categoryStyles[category] || 'default';

  return <span className={`category-badge ${tone}`}>{category}</span>;
}
