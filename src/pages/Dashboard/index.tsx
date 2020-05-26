import React, { useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import 'react-day-picker/lib/style.css';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  // Calendar,
} from './styles';

import Calendar from '../../components/Calendar';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { SelectedDate } from '../../hooks/selectedDateContext';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth();

  // const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
  //   if (modifiers.available) {
  //     setSelectedDate(day);
  //   }
  // }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="logo" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo!</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button">
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 25 </span>
            <span>Domingo</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="" alt="" />
              <strong>Jeison azevedo</strong>
              <span>
                <FiClock />
                8:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/15232721?s=460&v=4"
                  alt="Jeison Azevedo"
                />
                <strong>Jeison Azevedo</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/15232721?s=460&v=4"
                  alt="Jeison Azevedo"
                />
                <strong>Jeison Azevedo</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/15232721?s=460&v=4"
                  alt="Jeison Azevedo"
                />
                <strong>Jeison Azevedo</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <SelectedDate.Provider value={{ selectedDate, setSelectedDate }}>
          <Calendar />
        </SelectedDate.Provider>
      </Content>
    </Container>
  );
};

export default Dashboard;
