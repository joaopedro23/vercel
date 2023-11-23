
// Função para verificar se o nome já foi agendado
export const isNameAlreadyScheduled = (name: string): boolean => {
    const scheduledAppointments = JSON.parse(localStorage.getItem('scheduledAppointments') || '[]') as { nome: string }[];
    return scheduledAppointments.some((appointment) => appointment.nome === name);
  };
 

  // Função para submeter o agendamento
  export const submitAppointment = (name: string, appointmentDetails: any) => {
    if (isNameAlreadyScheduled(name)) {
      console.log('Este nome já possui um agendamento.');
      return false;
    }
  
    const newAppointment = {
      nome: name,
      ...appointmentDetails, // Outros detalhes do agendamento
    };
  
    const scheduledAppointments = JSON.parse(localStorage.getItem('scheduledAppointments') || '[]') as any[];
    scheduledAppointments.push(newAppointment);

    try {
      localStorage.setItem('scheduledAppointments', JSON.stringify(scheduledAppointments));
      console.log('Scheduled Appointments Saved:', scheduledAppointments);
        } catch (error) {
            console.error('Error saving appointments to localStorage:', error);
        }

  console.log('Agendamento realizado com sucesso!');

    return true;
  };
  