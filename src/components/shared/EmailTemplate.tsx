// src/components/shared/EmailTemplate.tsx
interface EmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

export default function EmailTemplate({ 
  name, 
  email, 
  subject, 
  message 
}: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>Nouveau message depuis le portfolio</h1>
      </div>
      
      <div style={{ padding: '30px', backgroundColor: '#f8fafc' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2 style={{ color: '#1f2937', marginBottom: '15px' }}>Informations du contact</h2>
          <p style={{ margin: '5px 0' }}><strong>Nom :</strong> {name}</p>
          <p style={{ margin: '5px 0' }}><strong>Email :</strong> {email}</p>
          <p style={{ margin: '5px 0' }}><strong>Sujet :</strong> {subject}</p>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#1f2937', marginBottom: '15px' }}>Message</h2>
          <div style={{ 
            backgroundColor: '#f1f5f9', 
            padding: '15px', 
            borderRadius: '6px',
            borderLeft: '4px solid #3b82f6'
          }}>
            <p style={{ margin: 0, lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
              {message}
            </p>
          </div>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#e5e7eb', 
        padding: '15px', 
        textAlign: 'center',
        fontSize: '12px',
        color: '#6b7280'
      }}>
        <p>Ce message a été envoyé depuis le portfolio d&#39;Olivier Mogonel</p>
        <p>© 2024 Olivier Mogonel - Tous droits réservés</p>
      </div>
    </div>
  )
}