'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Download, Printer, ChevronDown, ChevronUp, MessageCircle, Briefcase, Building, Timer, CheckSquare, RotateCcw, X, Phone, HelpCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  hasScheduleAlert?: boolean;
  departureLocation?: 'Fortaleza' | 'Jericoacoara'; // Nova propriedade para filtrar hotéis
}

interface Hotel {
  id: string;
  name: string;
  zone: string;
}

const services: Service[] = [
  // PRIMEIROS 3 SERVIÇOS (PRIORIDADE)
  { id: '11', name: 'Transfer Fortaleza x Jericoacoara (Regular)', category: 'Transfer', departureLocation: 'Fortaleza' },
  { id: '12', name: 'Transfer Jericoacoara x Fortaleza (Regular)', category: 'Transfer', departureLocation: 'Jericoacoara' },
  { id: '4', name: 'Passeio 3 Praias em 1 Dia', category: 'Passeio', departureLocation: 'Fortaleza' },
  
  // DEMAIS PASSEIOS
  { id: '1', name: 'Praia de Águas Belas', category: 'Passeio', departureLocation: 'Fortaleza' },
  { id: '2', name: 'Praia de Lagoinha', category: 'Passeio', departureLocation: 'Fortaleza' },
  { id: '3', name: 'Praia do Cumbuco', category: 'Passeio', departureLocation: 'Fortaleza' },
  { id: '5', name: 'Litoral Leste de Jericoacoara + Buraco Azul', category: 'Passeio', departureLocation: 'Jericoacoara' },
  { id: '6', name: 'Litoral Oeste de Jericoacoara', category: 'Passeio', departureLocation: 'Jericoacoara' },
  { id: '7', name: 'Buggy Litoral Leste de Jericoacoara', category: 'Passeio', departureLocation: 'Jericoacoara' },
  { id: '8', name: 'Buggy Litoral Oeste de Jericoacoara', category: 'Passeio', departureLocation: 'Jericoacoara' },
  { id: '9', name: 'Quadriciclo Litoral Oeste de Jericoacoara', category: 'Passeio', departureLocation: 'Jericoacoara' },
  { id: '10', name: 'Quadriciclo Litoral Leste de Jericoacoara', category: 'Passeio', departureLocation: 'Jericoacoara' },
  { id: '18', name: 'Jericoacoara em 1 dia', category: 'Passeio', departureLocation: 'Fortaleza' },
  
  // NOVO SERVIÇO ADICIONADO
  { id: '23', name: 'Quadriciclo Pôr do Sol Jericoacoara', category: 'Experiência', departureLocation: 'Jericoacoara' },
  
  // TRANSFERS ATUALIZADOS E NOVOS
  { id: '13', name: 'Transfer Aeroporto de Jericoacoara (JJD) → Vila de Jericoacoara (Regular)', category: 'Transfer', hasScheduleAlert: true, departureLocation: 'Jericoacoara' },
  { id: '14', name: 'Transfer Vila de Jericoacoara → Aeroporto de Jericoacoara (Regular)', category: 'Transfer', hasScheduleAlert: true, departureLocation: 'Jericoacoara' },
  { id: '15', name: 'Transfer Beach Park', category: 'Transfer', departureLocation: 'Fortaleza' },
  { id: '16', name: 'Transfer Aero de Fortaleza x Orla Marítima For (Regular)', category: 'Transfer', hasScheduleAlert: true, departureLocation: 'Fortaleza' },
  { id: '17', name: 'Transfer Privativo Fortaleza → Jericoacoara (até 6 pessoas)', category: 'Transfer', hasScheduleAlert: true, departureLocation: 'Fortaleza' },
  // NOVOS TRANSFERS ADICIONADOS
  { id: '19', name: 'Transfer Orla Marítima For x Aeroporto de Fortaleza (Regular)', category: 'Transfer', hasScheduleAlert: true, departureLocation: 'Fortaleza' },
  { id: '20', name: 'Transfer Jericoacoara para Fortaleza- 6 Pessoas', category: 'Transfer', hasScheduleAlert: true, departureLocation: 'Jericoacoara' },
  { id: '21', name: 'Transfer Fortaleza para Jericoacoara - 4 Pessoas', category: 'Transfer', hasScheduleAlert: true, departureLocation: 'Fortaleza' },
  { id: '22', name: 'Transfer Jericoacoara para Fortaleza - 4 Pessoas', category: 'Transfer', hasScheduleAlert: true, departureLocation: 'Jericoacoara' }
];

// Lista de hotéis e pousadas em Jericoacoara e Fortaleza
const hotels: Hotel[] = [
  // HOTÉIS DE JERICOACOARA
  { id: '1', name: 'A CASA É SUA!', zone: 'Jericoacoara' },
  { id: '2', name: 'ACONCHEGO POUSADA', zone: 'Jericoacoara' },
  { id: '3', name: 'ADELAIDE HOSPEDAGEM', zone: 'Jericoacoara' },
  { id: '4', name: 'AGAPANTHUS POUSADA', zone: 'Jericoacoara' },
  { id: '5', name: 'ALCHYMIST HOTEL', zone: 'Jericoacoara' },
  { id: '6', name: 'ALL BLUE', zone: 'Jericoacoara' },
  { id: '7', name: 'AMAZING JERI POUSADA', zone: 'Jericoacoara' },
  { id: '8', name: 'ANJO AZUL POUSADA', zone: 'Jericoacoara' },
  { id: '9', name: 'APARTAMENTO BOAS ENERGIAS JERI', zone: 'Jericoacoara' },
  { id: '10', name: 'APARTAMENTO CENTRAL & ECONÔMICO', zone: 'Jericoacoara' },
  { id: '11', name: 'APARTAMENTO FLORENCE', zone: 'Jericoacoara' },
  { id: '12', name: 'APARTAMENTO MANAY', zone: 'Jericoacoara' },
  { id: '13', name: 'APARTAMENTO NA PRAIA', zone: 'Jericoacoara' },
  { id: '14', name: 'APARTAMENTOS SABOR DA TERRA', zone: 'Jericoacoara' },
  { id: '15', name: 'APARTAMENTOS UPWIND JERI', zone: 'Jericoacoara' },
  { id: '16', name: 'APARTAMENTOS VILA CELESTE', zone: 'Jericoacoara' },
  { id: '17', name: 'APARTMENT AT SERROTE BREEZES CONDOMINIUM', zone: 'Jericoacoara' },
  { id: '18', name: 'APARTMENTOS SERROTE BREEZES', zone: 'Jericoacoara' },
  { id: '19', name: 'APÊ DO FABIANO', zone: 'Jericoacoara' },
  { id: '20', name: 'APENUNGA ECO HOTEL', zone: 'Jericoacoara' },
  { id: '21', name: 'ARAXÁ POUSADA', zone: 'Jericoacoara' },
  { id: '22', name: 'ARCA DO NOAH', zone: 'Jericoacoara' },
  { id: '23', name: 'AZUL POUSADA', zone: 'Jericoacoara' },
  { id: '24', name: 'BACURI HOUSE', zone: 'Jericoacoara' },
  { id: '25', name: 'BAHAKA JERI', zone: 'Jericoacoara' },
  { id: '26', name: 'BALI JERI POUSADA', zone: 'Jericoacoara' },
  { id: '27', name: 'BARRIGA DA LUA FLATS', zone: 'Jericoacoara' },
  { id: '28', name: 'B&B GIRASSOL', zone: 'Jericoacoara' },
  { id: '29', name: 'BEACH HOUSE', zone: 'Jericoacoara' },
  { id: '30', name: 'BEBEL KITE HOUSE', zone: 'Jericoacoara' },
  { id: '31', name: 'BED AND BREAKFAST CAPIM VERDE', zone: 'Jericoacoara' },
  { id: '32', name: 'BENU SUÍTES', zone: 'Jericoacoara' },
  { id: '33', name: 'BLESSED HOSTEL JERI', zone: 'Jericoacoara' },
  { id: '34', name: 'BLUE RESIDENCE HOTEL', zone: 'Jericoacoara' },
  { id: '35', name: 'BRANDON\'S KITCHENETTE', zone: 'Jericoacoara' },
  { id: '36', name: 'BRISA DO MAR BEACH', zone: 'Jericoacoara' },
  { id: '37', name: 'CACTUS HOSTEL', zone: 'Jericoacoara' },
  { id: '38', name: 'CAFE JERI HOTEL', zone: 'Jericoacoara' },
  { id: '39', name: 'CAMPING & HOSTEL TÔ A TOA', zone: 'Jericoacoara' },
  { id: '40', name: 'CAMPING NATUREZA', zone: 'Jericoacoara' },
  { id: '41', name: 'CANAÃ POUSADA', zone: 'Jericoacoara' },
  { id: '42', name: 'CASA AMIGA JERI', zone: 'Jericoacoara' },
  { id: '43', name: 'CASA AMOR & MAR', zone: 'Jericoacoara' },
  { id: '44', name: 'CASA ANKH JERI', zone: 'Jericoacoara' },
  { id: '45', name: 'CASA ARTURO', zone: 'Jericoacoara' },
  { id: '46', name: 'CASA AZUL INDIGO', zone: 'Jericoacoara' },
  { id: '47', name: 'CASA BECO DOCE', zone: 'Jericoacoara' },
  { id: '48', name: 'CASA BETTI', zone: 'Jericoacoara' },
  { id: '49', name: 'CASA BIA', zone: 'Jericoacoara' },
  { id: '50', name: 'CASA BOA VIDA', zone: 'Jericoacoara' },
  { id: '51', name: 'CASA BOUGAINVILLA', zone: 'Jericoacoara' },
  { id: '52', name: 'CASA CABORÉ', zone: 'Jericoacoara' },
  { id: '53', name: 'CASA CECILIA', zone: 'Jericoacoara' },
  { id: '54', name: 'CASA DA AMELINHA', zone: 'Jericoacoara' },
  { id: '55', name: 'CASA DA CION', zone: 'Jericoacoara' },
  { id: '56', name: 'CASA DA DANI', zone: 'Jericoacoara' },
  { id: '57', name: 'CASA DA GWEN', zone: 'Jericoacoara' },
  { id: '58', name: 'CASA DA LILA', zone: 'Jericoacoara' },
  { id: '59', name: 'CASA DA PAZ', zone: 'Jericoacoara' },
  { id: '60', name: 'CASA DA RO', zone: 'Jericoacoara' },
  { id: '61', name: 'CASA DA SÁ', zone: 'Jericoacoara' },
  { id: '62', name: 'CASA DA VOVÓ', zone: 'Jericoacoara' },
  { id: '63', name: 'CASA DE SOL JERI', zone: 'Jericoacoara' },
  { id: '64', name: 'CASA DO BOTO', zone: 'Jericoacoara' },
  { id: '65', name: 'CASA DO CRUSH', zone: 'Jericoacoara' },
  { id: '66', name: 'CASA DO DAVI JERI', zone: 'Jericoacoara' },
  { id: '67', name: 'CASA DO FRANCO', zone: 'Jericoacoara' },
  { id: '68', name: 'CASA ELEA', zone: 'Jericoacoara' },
  { id: '69', name: 'CASA EULÁ', zone: 'Jericoacoara' },
  { id: '70', name: 'CASA FAMILIAR', zone: 'Jericoacoara' },
  { id: '71', name: 'CASA FLOR', zone: 'Jericoacoara' },
  { id: '72', name: 'CASA FLOR DO MAR', zone: 'Jericoacoara' },
  { id: '73', name: 'CASA FORROZIM', zone: 'Jericoacoara' },
  { id: '74', name: 'CASA FREE WIND JERI', zone: 'Jericoacoara' },
  { id: '75', name: 'CASA FUFI', zone: 'Jericoacoara' },
  { id: '76', name: 'CASA GLADIUS', zone: 'Jericoacoara' },
  { id: '77', name: 'CASA IURUKUA', zone: 'Jericoacoara' },
  { id: '78', name: 'CASA JASMIN', zone: 'Jericoacoara' },
  { id: '79', name: 'CASA JERI', zone: 'Jericoacoara' },
  { id: '80', name: 'CASA JERI DE AÇUCAR', zone: 'Jericoacoara' },
  { id: '81', name: 'CASA KATU', zone: 'Jericoacoara' },
  { id: '82', name: 'CASA LOTUS', zone: 'Jericoacoara' },
  { id: '83', name: 'CASA MANDALA', zone: 'Jericoacoara' },
  { id: '84', name: 'CASA MAR SUITES', zone: 'Jericoacoara' },
  { id: '85', name: 'CASA MARTINA JERICOACOARA', zone: 'Jericoacoara' },
  { id: '86', name: 'CASA MIRELLA JERI', zone: 'Jericoacoara' },
  { id: '87', name: 'CASA MORADA DOS VENTOS', zone: 'Jericoacoara' },
  { id: '88', name: 'CASA N.8', zone: 'Jericoacoara' },
  { id: '89', name: 'CASA NA VILA', zone: 'Jericoacoara' },
  { id: '90', name: 'CASARÃO JERI', zone: 'Jericoacoara' },
  { id: '91', name: 'CASA SOL DE JERI', zone: 'Jericoacoara' },
  { id: '92', name: 'CASA SOSSEGO', zone: 'Jericoacoara' },
  { id: '93', name: 'CASA STRELA JERI SUITES', zone: 'Jericoacoara' },
  { id: '94', name: 'CASA SUIÇA BRASILEIRA', zone: 'Jericoacoara' },
  { id: '95', name: 'CASA TOCA DO SENADOR JERICOACOARA', zone: 'Jericoacoara' },
  { id: '96', name: 'CASA VALENTINI', zone: 'Jericoacoara' },
  { id: '97', name: 'CASA ZAION', zone: 'Jericoacoara' },
  { id: '98', name: 'CHALÉ ALPINO SUÍTE 14', zone: 'Jericoacoara' },
  { id: '99', name: 'CHALE DA ELISA', zone: 'Jericoacoara' },
  { id: '100', name: 'CHALÉ DAS DUNAS', zone: 'Jericoacoara' },
  { id: '101', name: 'CHALÉ IGUANA', zone: 'Jericoacoara' },
  { id: '102', name: 'CHALÉ PARAÍSO', zone: 'Jericoacoara' },
  { id: '103', name: 'CHALÉ PREGUIÇA (CASA DA JULIA)', zone: 'Jericoacoara' },
  { id: '104', name: 'CHEZ BIBI', zone: 'Jericoacoara' },
  { id: '105', name: 'CHEZ ELLERY', zone: 'Jericoacoara' },
  { id: '106', name: 'CONCEITO SILVESTRE', zone: 'Jericoacoara' },
  { id: '107', name: 'CUMELEN', zone: 'Jericoacoara' },
  { id: '108', name: 'DELICIA SUITES', zone: 'Jericoacoara' },
  { id: '109', name: 'DOCE SUITES', zone: 'Jericoacoara' },
  { id: '110', name: 'DREAM HOSTEL', zone: 'Jericoacoara' },
  { id: '111', name: 'DUNAS DE JERI HOSTEL', zone: 'Jericoacoara' },
  { id: '112', name: 'ECO JERIMAGIA', zone: 'Jericoacoara' },
  { id: '113', name: 'ECO RESORT VENTO LESTE', zone: 'Jericoacoara' },
  { id: '114', name: 'ENCANTOS DE MARIA', zone: 'Jericoacoara' },
  { id: '115', name: 'ENJOY JERI FLATS', zone: 'Jericoacoara' },
  { id: '116', name: 'ESPAÇO FATEIXA', zone: 'Jericoacoara' },
  { id: '117', name: 'ESSENZA DUNE HOTEL', zone: 'Jericoacoara' },
  { id: '118', name: 'ESSENZA HOTEL', zone: 'Jericoacoara' },
  { id: '119', name: 'FLAT BOUGAINVILLA', zone: 'Jericoacoara' },
  { id: '120', name: 'FLAT DOCE JERI', zone: 'Jericoacoara' },
  { id: '121', name: 'FLAT PARAÍSO JERI', zone: 'Jericoacoara' },
  { id: '122', name: 'FLAT PEDRA FURADA', zone: 'Jericoacoara' },
  { id: '123', name: 'FLAT UNKUE', zone: 'Jericoacoara' },
  { id: '124', name: 'FLEURJERI', zone: 'Jericoacoara' },
  { id: '125', name: 'FRIDA HOSTEL FEMININO', zone: 'Jericoacoara' },
  { id: '126', name: 'FUN HOUSE', zone: 'Jericoacoara' },
  { id: '127', name: 'GIN JERI FLATS', zone: 'Jericoacoara' },
  { id: '128', name: 'GREEN JERI POUSADA', zone: 'Jericoacoara' },
  { id: '129', name: 'GUACO HOUSE', zone: 'Jericoacoara' },
  { id: '130', name: 'GUEST HOUSE FLOW', zone: 'Jericoacoara' },
  { id: '131', name: 'HAKA MAORI', zone: 'Jericoacoara' },
  { id: '132', name: 'HAPPY STAY', zone: 'Jericoacoara' },
  { id: '133', name: 'HB HOUSE', zone: 'Jericoacoara' },
  { id: '134', name: 'HOSPEDAGEM DA MARI', zone: 'Jericoacoara' },
  { id: '135', name: 'HOSPEDARIA JERI BRASIL HOUSE', zone: 'Jericoacoara' },
  { id: '136', name: 'HOSTEL AMÉRICA DO SUL', zone: 'Jericoacoara' },
  { id: '137', name: 'HOSTEL DA CAROL', zone: 'Jericoacoara' },
  { id: '138', name: 'HOSTEL DA PRAÇA', zone: 'Jericoacoara' },
  { id: '139', name: 'HOSTEL GOOD VIBE JERI', zone: 'Jericoacoara' },
  { id: '140', name: 'HOSTEL JERI CENTRAL', zone: 'Jericoacoara' },
  { id: '141', name: 'HOSTEL JERICOACOARIANO', zone: 'Jericoacoara' },
  { id: '142', name: 'HOSTEL MARESIA JERICOACOARA', zone: 'Jericoacoara' },
  { id: '143', name: 'HOSTEL OM JERICOACOARA', zone: 'Jericoacoara' },
  { id: '144', name: 'HOSTEL VISUAL', zone: 'Jericoacoara' },
  { id: '145', name: 'HOTEL CASA DE AREIA', zone: 'Jericoacoara' },
  { id: '146', name: 'HOTEL CASALÔ', zone: 'Jericoacoara' },
  { id: '147', name: 'HOTEL CASA NA PRAIA JERI', zone: 'Jericoacoara' },
  { id: '148', name: 'HOTEL ISALANA', zone: 'Jericoacoara' },
  { id: '149', name: 'HOTEL ISALANA BEACH', zone: 'Jericoacoara' },
  { id: '150', name: 'HOTEL JERI', zone: 'Jericoacoara' },
  { id: '151', name: 'HOTEL JERIBAR', zone: 'Jericoacoara' },
  { id: '152', name: 'HOTEL MARÉ MANSA', zone: 'Jericoacoara' },
  { id: '153', name: 'HOTEL SÃO FRANCISCO', zone: 'Jericoacoara' },
  { id: '154', name: 'HOTEL VILLA TERRA VIVA', zone: 'Jericoacoara' },
  { id: '155', name: 'HOUSE JERI', zone: 'Jericoacoara' },
  { id: '156', name: 'HURRICANE JERI GARDENS', zone: 'Jericoacoara' },
  { id: '157', name: 'HURRICANE PRAIA', zone: 'Jericoacoara' },
  { id: '158', name: 'JERI 360º HOUSE', zone: 'Jericoacoara' },
  { id: '159', name: 'JERI 360º HOUSE ANEXO', zone: 'Jericoacoara' },
  { id: '160', name: 'JERI BAHIA HOSTEL', zone: 'Jericoacoara' },
  { id: '161', name: 'JERI BRASIL HOSTEL', zone: 'Jericoacoara' },
  { id: '162', name: 'JERICOACOARA BEACH', zone: 'Jericoacoara' },
  { id: '163', name: 'JERICOACOARA HOSTEL - TIROL', zone: 'Jericoacoara' },
  { id: '164', name: 'JERI FLATS', zone: 'Jericoacoara' },
  { id: '165', name: 'JERI HOSTEL ARTE', zone: 'Jericoacoara' },
  { id: '166', name: 'JERI HOSTEL E CASA', zone: 'Jericoacoara' },
  { id: '167', name: 'JERI PARADISE', zone: 'Jericoacoara' },
  { id: '168', name: 'JERIPITANGA BEACH', zone: 'Jericoacoara' },
  { id: '169', name: 'JERI POUSADA', zone: 'Jericoacoara' },
  { id: '170', name: 'JERI RESIDENCE VISUAL', zone: 'Jericoacoara' },
  { id: '171', name: 'JERI SUITES | ACCOMMODATION', zone: 'Jericoacoara' },
  { id: '172', name: 'JERI SUITES SUN', zone: 'Jericoacoara' },
  { id: '173', name: 'JERI SWEET HOME', zone: 'Jericoacoara' },
  { id: '174', name: 'JERI VILLAGE', zone: 'Jericoacoara' },
  { id: '175', name: 'JERIZZ HOUSE', zone: 'Jericoacoara' },
  { id: '176', name: 'KITE HOUSE JERI', zone: 'Jericoacoara' },
  { id: '177', name: 'LA BELLE JERI', zone: 'Jericoacoara' },
  { id: '178', name: 'LA CASINA JERICOACOARA', zone: 'Jericoacoara' },
  { id: '179', name: 'LA VILLA PRAIA', zone: 'Jericoacoara' },
  { id: '180', name: 'LE VENT JERI CASA', zone: 'Jericoacoara' },
  { id: '181', name: 'LIA POUSADA', zone: 'Jericoacoara' },
  { id: '182', name: 'LUCIANE CASA', zone: 'Jericoacoara' },
  { id: '183', name: 'LULU FLATS', zone: 'Jericoacoara' },
  { id: '184', name: 'MAGIC HOME JERICOACOARA', zone: 'Jericoacoara' },
  { id: '185', name: 'MAHI JERI', zone: 'Jericoacoara' },
  { id: '186', name: 'MAISON MARAVILHA', zone: 'Jericoacoara' },
  { id: '187', name: 'MALAI BEACH HOTEL', zone: 'Jericoacoara' },
  { id: '188', name: 'MANDALA HOSTEL JERI', zone: 'Jericoacoara' },
  { id: '189', name: 'MARIA TERESA BRAGANÇA POUSADA', zone: 'Jericoacoara' },
  { id: '190', name: 'MEU LUGAR FLAT', zone: 'Jericoacoara' },
  { id: '191', name: 'MEU LUGAR HOSTEL', zone: 'Jericoacoara' },
  { id: '192', name: 'MILKYWAY HOTEL', zone: 'Jericoacoara' },
  { id: '193', name: 'MINI HOTEL', zone: 'Jericoacoara' },
  { id: '194', name: 'MINI HOTEL DUNAS', zone: 'Jericoacoara' },
  { id: '195', name: 'MINI JERI', zone: 'Jericoacoara' },
  { id: '196', name: 'MIRAGE JERI', zone: 'Jericoacoara' },
  { id: '197', name: 'MUNDOMO GLAMPING', zone: 'Jericoacoara' },
  { id: '198', name: 'MY BLUE HOTEL', zone: 'Jericoacoara' },
  { id: '199', name: 'MY JERI HOUSE', zone: 'Jericoacoara' },
  { id: '200', name: 'MYM BOUGAINVILLE', zone: 'Jericoacoara' },
  { id: '201', name: 'MYM DUNAS', zone: 'Jericoacoara' },
  { id: '202', name: 'MYM FORRÓ', zone: 'Jericoacoara' },
  { id: '203', name: 'MYM JERICOACOARA', zone: 'Jericoacoara' },
  { id: '204', name: 'MYO TATTOO BAR POUSADA', zone: 'Jericoacoara' },
  { id: '205', name: 'NA CASA D\'ELASJERÍ1', zone: 'Jericoacoara' },
  { id: '206', name: 'NA KIT\'DELLAS JERICOACOARA', zone: 'Jericoacoara' },
  { id: '207', name: 'NATURA HOSTEL JERI', zone: 'Jericoacoara' },
  { id: '208', name: 'NOSSA CASA EM JERI', zone: 'Jericoacoara' },
  { id: '209', name: 'NUMEI DE JERI', zone: 'Jericoacoara' },
  { id: '210', name: 'OM SWEET HOME', zone: 'Jericoacoara' },
  { id: '211', name: 'OM SWEET RESIDENCE', zone: 'Jericoacoara' },
  { id: '212', name: 'OUR HOUSE IN JERI', zone: 'Jericoacoara' },
  { id: '213', name: 'OUTSIDE.JERI', zone: 'Jericoacoara' },
  { id: '214', name: 'PARADISE OM JERI', zone: 'Jericoacoara' },
  { id: '215', name: 'PESCADOR - POUSADA DE CHARME', zone: 'Jericoacoara' },
  { id: '216', name: 'PORTA DO SOL JERI', zone: 'Jericoacoara' },
  { id: '217', name: 'PORTAL JERI BEACH', zone: 'Jericoacoara' },
  { id: '218', name: 'POUSADA ACQUA SALATA', zone: 'Jericoacoara' },
  { id: '219', name: 'POUSADA ÁGUAS CLARAS', zone: 'Jericoacoara' },
  { id: '220', name: 'POUSADA ÁGUIA DA VILA', zone: 'Jericoacoara' },
  { id: '221', name: 'POUSADA ÁGUIA JERI', zone: 'Jericoacoara' },
  { id: '222', name: 'POUSADA AKI JERI', zone: 'Jericoacoara' },
  { id: '223', name: 'POUSADA ALOHA JERI', zone: 'Jericoacoara' },
  { id: '224', name: 'POUSADA ALQUIMIA', zone: 'Jericoacoara' },
  { id: '225', name: 'POUSADA ANGELICA', zone: 'Jericoacoara' },
  { id: '226', name: 'POUSADA APART W.ROCHA', zone: 'Jericoacoara' },
  { id: '227', name: 'POUSADA AQUA', zone: 'Jericoacoara' },
  { id: '228', name: 'POUSADA ARMONIA JERI', zone: 'Jericoacoara' },
  { id: '229', name: 'POUSADA ATLANTICA JERI', zone: 'Jericoacoara' },
  { id: '230', name: 'POUSADA ATLANTIS', zone: 'Jericoacoara' },
  { id: '231', name: 'POUSADA AVALON', zone: 'Jericoacoara' },

  // HOTÉIS DE FORTALEZA
  { id: '232', name: 'Pous. Arcos Iris', zone: 'Fortaleza' },
  { id: '233', name: 'Golden Beach', zone: 'Fortaleza' },
  { id: '234', name: 'Crocobeach Hotel', zone: 'Fortaleza' },
  { id: '235', name: 'Marbello Ariaú', zone: 'Fortaleza' },
  { id: '236', name: 'Hotel Boreas', zone: 'Fortaleza' },
  { id: '237', name: 'Maly Boutique', zone: 'Fortaleza' },
  { id: '238', name: 'Hospedaria da praia', zone: 'Fortaleza' },
  { id: '239', name: 'Beach Vilage', zone: 'Fortaleza' },
  { id: '240', name: 'Porto Futuro Hotel', zone: 'Fortaleza' },
  { id: '241', name: 'POUSADA TOCO DO MAR', zone: 'Fortaleza' },
  { id: '242', name: 'GRAN MAREIRO', zone: 'Fortaleza' },
  { id: '243', name: 'VILA GALÉ PF', zone: 'Fortaleza' },
  { id: '244', name: 'HOTEL LITORAL', zone: 'Fortaleza' },
  { id: '245', name: 'POUSADA ARCOS IRIS', zone: 'Fortaleza' },
  { id: '246', name: 'Italia Beach', zone: 'Fortaleza' },
  { id: '247', name: 'Costa do Mar', zone: 'Fortaleza' },
  { id: '248', name: 'Ideal Praia Hotel', zone: 'Fortaleza' },
  { id: '249', name: 'Beach Class', zone: 'Fortaleza' },
  { id: '250', name: 'Hotel Aquarius', zone: 'Fortaleza' },
  { id: '251', name: 'Pousada Centro e Praia', zone: 'Fortaleza' },
  { id: '252', name: 'Maré Praia Hotel', zone: 'Fortaleza' },
  { id: '253', name: 'Sonho Iracema Hostel', zone: 'Fortaleza' },
  { id: '254', name: 'Aquarius Residence', zone: 'Fortaleza' },
  { id: '255', name: 'SONATA DE IRACEMA', zone: 'Fortaleza' },
  { id: '256', name: 'FORT MAR', zone: 'Fortaleza' },
  { id: '257', name: 'URB HOTEL', zone: 'Fortaleza' },
  { id: '258', name: 'ECCO HOTEL', zone: 'Fortaleza' },
  { id: '259', name: 'VILLA PARK', zone: 'Fortaleza' },
  { id: '260', name: 'PORTAL DA PRAIA', zone: 'Fortaleza' },
  { id: '261', name: 'OCEAN PRAIA', zone: 'Fortaleza' },
  { id: '262', name: 'FORTAL VILLA PRAIA', zone: 'Fortaleza' },
  { id: '263', name: 'ALGARVE', zone: 'Fortaleza' },
  { id: '264', name: 'ALBERGARIA HOSTEL', zone: 'Fortaleza' },
  { id: '265', name: 'HOTEL CASA DE PRAIA', zone: 'Fortaleza' },
  { id: '266', name: 'HOTEL CASA BLANCA', zone: 'Fortaleza' },
  { id: '267', name: 'PLAZA PRAIA', zone: 'Fortaleza' },
  { id: '268', name: 'FLAT CLASSIC', zone: 'Fortaleza' },
  { id: '269', name: 'IBIS BUDGET', zone: 'Fortaleza' },
  { id: '270', name: 'ROTORUA INN', zone: 'Fortaleza' },
  { id: '271', name: 'PRAIA CENTRO', zone: 'Fortaleza' },
  { id: '272', name: 'MAREDOMUS', zone: 'Fortaleza' },
  { id: '273', name: 'IRACEMA TRAVEL', zone: 'Fortaleza' },
  { id: '274', name: 'IBIS PRAIA DE IRACEMA', zone: 'Fortaleza' },
  { id: '275', name: 'CARPPA/TINTTO', zone: 'Fortaleza' },
  { id: '276', name: 'PLAZA PRAIA', zone: 'Fortaleza' },
  { id: '277', name: 'HOLIDAY INN', zone: 'Fortaleza' },
  { id: '278', name: 'HOTEL DIOGO', zone: 'Fortaleza' },
  { id: '279', name: 'MAGNA PRAIA', zone: 'Fortaleza' },
  { id: '280', name: 'Ocean Tower Flat', zone: 'Fortaleza' },
  { id: '281', name: 'Iracema Residence flats', zone: 'Fortaleza' },
  { id: '282', name: 'GRAN MARQUISE', zone: 'Fortaleza' },
  { id: '283', name: 'NOBILE SUITES GOLDEN FORTAL.', zone: 'Fortaleza' },
  { id: '284', name: 'IATE PLAZA', zone: 'Fortaleza' },
  { id: '285', name: 'PAULI HOTEL', zone: 'Fortaleza' },
  { id: '286', name: 'Kalango Hostel', zone: 'Fortaleza' },
  { id: '287', name: 'Marina Park', zone: 'Fortaleza' },
  { id: '288', name: 'Hotel Meridional', zone: 'Fortaleza' },
  { id: '289', name: 'REFUGIO HOSTEL', zone: 'Fortaleza' },
  { id: '290', name: 'Hotel Fortaleza Inn', zone: 'Fortaleza' },
  { id: '291', name: 'Bristol Jangada', zone: 'Fortaleza' },
  { id: '292', name: 'Hotel Praia Mar', zone: 'Fortaleza' },
  { id: '293', name: 'My Way - Helbor', zone: 'Fortaleza' },
  { id: '294', name: 'LANDSCAPE', zone: 'Fortaleza' },
  { id: '295', name: 'FORTALEZ A INN', zone: 'Fortaleza' },
  { id: '296', name: 'HOTEL PRAIANO', zone: 'Fortaleza' },
  { id: '297', name: 'BOURBON', zone: 'Fortaleza' },
  { id: '298', name: 'BRASIL TROPICAL', zone: 'Fortaleza' },
  { id: '299', name: 'BLUE TREE', zone: 'Fortaleza' },
  { id: '300', name: 'SEARA', zone: 'Fortaleza' },
  { id: '301', name: 'MAREIRO', zone: 'Fortaleza' },
  { id: '302', name: 'LUZEIROS', zone: 'Fortaleza' },
  { id: '303', name: 'VILLA MAYOR', zone: 'Fortaleza' },
  { id: '304', name: 'HOTEL OASIS', zone: 'Fortaleza' }
];

// Cor azul oficial da SIM7 (extraída do logo)
const SIM7_BLUE = '#1E40AF';

const getCategoryColor = (category: string) => {
  const colors = {
    'Transfer': 'bg-blue-100 text-blue-800',
    'Passeio': 'bg-green-100 text-green-800',
    'Experiência': 'bg-purple-100 text-purple-800',
    'Consulte Horário de embarque no nosso canal': 'bg-orange-100 text-orange-800'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

// Função para adicionar ícones aos termos específicos
const addIconToText = (text: string) => {
  // Serviços / Áreas Correlatas
  if (text.toLowerCase().includes('serviço') || text.toLowerCase().includes('funcionalidade')) {
    return (
      <span className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-blue-600" />
        </div>
        {text}
      </span>
    );
  }
  
  // Hotel / Hospedagem
  if (text.toLowerCase().includes('hotel') || text.toLowerCase().includes('hospedagem')) {
    return (
      <span className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Building className="w-4 h-4 text-blue-600" />
        </div>
        {text}
      </span>
    );
  }
  
  // Horários / Embarques/Desembarques
  if (text.toLowerCase().includes('horário') || text.toLowerCase().includes('embarque') || text.toLowerCase().includes('desembarque')) {
    return (
      <span className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Timer className="w-4 h-4 text-blue-600" />
        </div>
        {text}
      </span>
    );
  }
  
  return text;
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [serviceSearch, setServiceSearch] = useState('');
  const [hotelSearch, setHotelSearch] = useState('');
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllHotels, setShowAllHotels] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [pendingService, setPendingService] = useState<Service | null>(null);
  const [showScheduleAlertPopup, setShowScheduleAlertPopup] = useState(false);
  const [showOtherServicesPopup, setShowOtherServicesPopup] = useState(false);

  // Configurações do sistema
  const footerText = 'Feito por SIM7 com ❤️';
  const whatsappNumber = '5585996241187'; // Número atualizado: +55 85 99624-1187
  const heroTitle = 'Consultar horários de embarques';
  const observations = [
    'Aguardar 10 minutos antes na recepção.',
    'Verifique com cuidado o seu serviço e atente-se ao horário de embarque.',
    'Em caso de dúvidas, entre em contato com nosso suporte clicando no botão do WhatsApp.',
    'Nosso guia chamará você pelo nome na recepção do hotel.'
  ];

  // Filtrar serviços baseado na busca - BUSCA PRECISA E FUNCIONAL
  const filteredServices = useMemo(() => {
    if (!serviceSearch) return services;
    
    const searchTerm = serviceSearch.toLowerCase().trim();
    
    return services.filter(service => {
      const serviceName = service.name.toLowerCase();
      const serviceCategory = service.category.toLowerCase();
      
      // Busca precisa que funciona corretamente
      return serviceName.includes(searchTerm) || 
             serviceCategory.includes(searchTerm);
    });
  }, [serviceSearch]);

  // Serviços em destaque (primeiros 6)
  const featuredServices = services.slice(0, 6);
  
  // Serviços a serem exibidos
  const servicesToShow = showAllServices ? filteredServices : featuredServices;

  // Filtrar hotéis baseado na busca E no serviço selecionado
  const filteredHotels = useMemo(() => {
    let hotelsToFilter = hotels;
    
    // Filtrar por localização baseado no serviço selecionado
    if (selectedService && selectedService.departureLocation) {
      hotelsToFilter = hotels.filter(hotel => hotel.zone === selectedService.departureLocation);
    }
    
    // Filtrar por busca
    if (!hotelSearch) return hotelsToFilter;
    return hotelsToFilter.filter(hotel => 
      hotel.name.toLowerCase().includes(hotelSearch.toLowerCase()) ||
      hotel.zone.toLowerCase().includes(hotelSearch.toLowerCase())
    );
  }, [hotelSearch, selectedService]);

  // Hotéis a serem exibidos (primeiros 6 ou todos)
  const hotelsToShow = showAllHotels ? filteredHotels : filteredHotels.slice(0, 6);

  // Função para gerar horários específicos baseados no serviço e hotel
  const generateSchedule = () => {
    if (!selectedService || !selectedHotel) return null;
    
    // Verificar se o serviço tem alerta de horário
    if (selectedService.hasScheduleAlert) {
      return 'Alerta para essa reserva, para saber o horário entre em contato com o nosso suporte';
    }
    
    // Verificar se o hotel está na zona correta para o serviço
    if (selectedService.departureLocation && selectedHotel.zone !== selectedService.departureLocation) {
      return `❌ ERRO: Este serviço sai de ${selectedService.departureLocation}, mas o hotel selecionado está em ${selectedHotel.zone}. Por favor, selecione um hotel em ${selectedService.departureLocation} ou entre em contato com o suporte.`;
    }
    
    // Horários específicos para hotéis de Jericoacoara
    if (selectedHotel.zone === 'Jericoacoara') {
      const jericoacoaraSchedules: { [key: string]: string } = {
        'Transfer Fortaleza x Jericoacoara (Regular)': '14:30',
        'Transfer Jericoacoara x Fortaleza (Regular)': '11:00',
        'Litoral Leste de Jericoacoara + Buraco Azul': '09:00',
        'Litoral Oeste de Jericoacoara': '09:00',
        'Buggy Litoral Leste de Jericoacoara': '09:00',
        'Buggy Litoral Oeste de Jericoacoara': '09:00',
        'Quadriciclo Litoral Oeste de Jericoacoara': '09:00',
        'Quadriciclo Litoral Leste de Jericoacoara': '09:00',
        'Quadriciclo Pôr do Sol Jericoacoara': '16:30', // NOVO SERVIÇO COM HORÁRIO FIXO
        'Jericoacoara em 1 dia': '08:00'
      };

      if (jericoacoaraSchedules[selectedService.name]) {
        return jericoacoaraSchedules[selectedService.name];
      }
    }

    // Horários específicos para hotéis de Fortaleza baseados na planilha
    if (selectedHotel.zone === 'Fortaleza') {
      const fortalezaSchedules: { [key: string]: { [key: string]: string } } = {
        // Transfer Fortaleza x Jericoacoara (Regular) - HORÁRIOS EXATOS DA PLANILHA
        'Transfer Fortaleza x Jericoacoara (Regular)': {
          'Pous. Arcos Iris': '06:50',
          'Golden Beach': '06:50',
          'Crocobeach Hotel': '06:50',
          'Marbello Ariaú': '06:50',
          'Hotel Boreas': '06:50',
          'Maly Boutique': '06:50',
          'Hospedaria da praia': '06:50',
          'Beach Vilage': '06:50',
          'Porto Futuro Hotel': '06:50',
          'Ocean Tower Flat': '07:15',
          'Iracema Residence flats': '07:15',
          'Hotel Fortaleza Inn': '07:20',
          'Bristol Jangada': '07:20',
          'Hotel Praia Mar': '07:20',
          'My Way - Helbor': '07:20',
          'Italia Beach': '07:30',
          'Costa do Mar': '07:40',
          'Ideal Praia Hotel': '07:40',
          'Beach Class': '07:40',
          'Hotel Aquarius': '07:40',
          'Pousada Centro e Praia': '07:40',
          'Maré Praia Hotel': '07:40',
          'Sonho Iracema Hostel': '07:40',
          'Aquarius Residence': '07:50',
          'Kalango Hostel': '07:50',
          'Marina Park': '08:00',
          'Hotel Meridional': '08:00',
          'SONATA DE IRACEMA': '07:40',
          'FORT MAR': '07:40',
          'GRAN MARQUISE': '07:15',
          'LANDSCAPE': '07:20',
          'POUSADA TOCO DO MAR': '06:50',
          'URB HOTEL': '07:40',
          'ECCO HOTEL': '07:40',
          'VILLA PARK': '07:30',
          'FORTALEZ A INN': '07:20',
          'PORTAL DA PRAIA': '07:40',
          'OCEAN PRAIA': '07:40',
          'FORTAL VILLA PRAIA': '07:40',
          'ALGARVE': '07:40',
          'ALBERGARIA HOSTEL': '07:40',
          'HOTEL CASA DE PRAIA': '07:40',
          'HOTEL CASA BLANCA': '07:40',
          'PLAZA PRAIA': '07:40',
          'FLAT CLASSIC': '07:40',
          'NOBILE SUITES GOLDEN FORTAL.': '07:15',
          'IBIS BUDGET': '07:45',
          'ROTORUA INN': '07:40',
          'PRAIA CENTRO': '07:40',
          'HOTEL PRAIANO': '07:20',
          'BOURBON': '07:25',
          'BRASIL TROPICAL': '07:20',
          'BLUE TREE': '07:20',
          'SEARA': '07:20',
          'MAREDOMUS': '07:40',
          'MAREIRO': '07:25',
          'GRAN MAREIRO': '06:50',
          'VILA GALÉ PF': '06:50',
          'HOTEL LITORAL': '06:50',
          'LUZEIROS': '07:20',
          'VILLA MAYOR': '07:20',
          'IRACEMA TRAVEL': '07:40',
          'IBIS PRAIA DE IRACEMA': '07:40',
          'CARPPA/TINTTO': '07:50',
          'POUSADA ARCOS IRIS': '06:50',
          'REFUGIO HOSTEL': '08:00',
          'HOLIDAY INN': '07:40',
          'HOTEL DIOGO': '07:30',
          'HOTEL OASIS': '07:20',
          'IATE PLAZA': '07:15',
          'MAGNA PRAIA': '07:40',
          'PAULI HOTEL': '07:15'
        },
        // Passeio 3 Praias em 1 Dia
        'Passeio 3 Praias em 1 Dia': {
          'Pous. Arcos Iris': '07:50',
          'Golden Beach': '07:50',
          'Crocobeach Hotel': '07:50',
          'Marbello Ariaú': '07:50',
          'Hotel Boreas': '07:50',
          'Maly Boutique': '07:50',
          'Hospedaria da praia': '07:50',
          'Beach Vilage': '07:50',
          'Porto Futuro Hotel': '07:50',
          'POUSADA TOCO DO MAR': '07:50',
          'GRAN MAREIRO': '07:50',
          'VILA GALÉ PF': '07:50',
          'HOTEL LITORAL': '07:50',
          'POUSADA ARCOS IRIS': '07:50',
          'Italia Beach': '07:15',
          'Costa do Mar': '07:10',
          'Ideal Praia Hotel': '07:10',
          'Beach Class': '07:10',
          'Hotel Aquarius': '07:10',
          'Pousada Centro e Praia': '07:00',
          'Maré Praia Hotel': '07:00',
          'Sonho Iracema Hostel': '07:10',
          'Aquarius Residence': '07:00',
          'SONATA DE IRACEMA': '07:00',
          'FORT MAR': '07:00',
          'URB HOTEL': '07:00',
          'ECCO HOTEL': '07:00',
          'VILLA PARK': '07:20',
          'PORTAL DA PRAIA': '07:00',
          'OCEAN PRAIA': '07:00',
          'FORTAL VILLA PRAIA': '07:00',
          'ALGARVE': '07:00',
          'ALBERGARIA HOSTEL': '07:00',
          'HOTEL CASA DE PRAIA': '07:00',
          'HOTEL CASA BLANCA': '07:00',
          'PLAZA PRAIA': '07:00',
          'FLAT CLASSIC': '07:00',
          'IBIS BUDGET': '07:00',
          'ROTORUA INN': '07:10',
          'PRAIA CENTRO': '07:10',
          'MAREDOMUS': '07:10',
          'IRACEMA TRAVEL': '07:10',
          'IBIS PRAIA DE IRACEMA': '07:10',
          'CARPPA/TINTTO': '07:00',
          'HOLIDAY INN': '07:10',
          'HOTEL DIOGO': '07:15',
          'MAGNA PRAIA': '07:10',
          'Ocean Tower Flat': '07:30',
          'Iracema Residence flats': '07:30',
          'GRAN MARQUISE': '07:30',
          'NOBILE SUITES GOLDEN FORTAL.': '07:30',
          'IATE PLAZA': '07:30',
          'PAULI HOTEL': '07:30',
          'Kalango Hostel': '07:00',
          'Marina Park': '07:00',
          'Hotel Meridional': '07:00',
          'REFUGIO HOSTEL': '07:00',
          'Hotel Fortaleza Inn': '07:20',
          'Bristol Jangada': '07:20',
          'Hotel Praia Mar': '07:20',
          'My Way - Helbor': '07:20',
          'LANDSCAPE': '07:20',
          'FORTALEZ A INN': '07:20',
          'HOTEL PRAIANO': '07:20',
          'BOURBON': '07:15',
          'BRASIL TROPICAL': '07:20',
          'BLUE TREE': '07:20',
          'SEARA': '07:20',
          'MAREIRO': '07:15',
          'LUZEIROS': '07:20',
          'VILLA MAYOR': '07:20',
          'HOTEL OASIS': '07:20'
        },
        // Praia do Cumbuco
        'Praia do Cumbuco': {
          'Pous. Arcos Iris': '07:50',
          'Golden Beach': '07:50',
          'Crocobeach Hotel': '07:50',
          'Marbello Ariaú': '07:50',
          'Hotel Boreas': '07:50',
          'Maly Boutique': '07:50',
          'Hospedaria da praia': '07:50',
          'Beach Vilage': '07:50',
          'Porto Futuro Hotel': '07:50',
          'POUSADA TOCO DO MAR': '07:50',
          'GRAN MAREIRO': '07:50',
          'VILA GALÉ PF': '07:50',
          'HOTEL LITORAL': '07:50',
          'POUSADA ARCOS IRIS': '07:50',
          'Italia Beach': '08:20',
          'Costa do Mar': '08:30',
          'Ideal Praia Hotel': '08:30',
          'Beach Class': '08:30',
          'Hotel Aquarius': '08:30',
          'Pousada Centro e Praia': '08:35',
          'Maré Praia Hotel': '08:35',
          'Sonho Iracema Hostel': '08:30',
          'Aquarius Residence': '08:35',
          'SONATA DE IRACEMA': '08:35',
          'FORT MAR': '08:35',
          'URB HOTEL': '08:30',
          'ECCO HOTEL': '08:30',
          'VILLA PARK': '08:20',
          'PORTAL DA PRAIA': '08:35',
          'OCEAN PRAIA': '08:30',
          'FORTAL VILLA PRAIA': '08:35',
          'ALGARVE': '08:40',
          'ALBERGARIA HOSTEL': '08:30',
          'HOTEL CASA DE PRAIA': '08:30',
          'HOTEL CASA BLANCA': '08:30',
          'PLAZA PRAIA': '08:30',
          'FLAT CLASSIC': '08:30',
          'IBIS BUDGET': '08:40',
          'ROTORUA INN': '08:30',
          'PRAIA CENTRO': '08:30',
          'MAREDOMUS': '08:30',
          'IRACEMA TRAVEL': '08:30',
          'IBIS PRAIA DE IRACEMA': '08:30',
          'CARPPA/TINTTO': '08:35',
          'HOLIDAY INN': '08:30',
          'HOTEL DIOGO': '08:20',
          'MAGNA PRAIA': '08:30',
          'Ocean Tower Flat': '08:00',
          'Iracema Residence flats': '08:00',
          'GRAN MARQUISE': '08:00',
          'NOBILE SUITES GOLDEN FORTAL.': '08:00',
          'IATE PLAZA': '08:10',
          'PAULI HOTEL': '08:10',
          'Kalango Hostel': '08:40',
          'Marina Park': '08:40',
          'Hotel Meridional': '08:40',
          'REFUGIO HOSTEL': '08:40',
          'Hotel Fortaleza Inn': '08:20',
          'Bristol Jangada': '08:20',
          'Hotel Praia Mar': '08:20',
          'My Way - Helbor': '08:20',
          'LANDSCAPE': '08:20',
          'FORTALEZ A INN': '08:20',
          'HOTEL PRAIANO': '08:20',
          'BOURBON': '08:15',
          'BRASIL TROPICAL': '08:20',
          'BLUE TREE': '08:20',
          'SEARA': '08:20',
          'MAREIRO': '08:15',
          'LUZEIROS': '08:20',
          'VILLA MAYOR': '08:20',
          'HOTEL OASIS': '08:20'
        },
        // Praia de Lagoinha
        'Praia de Lagoinha': {
          'Pous. Arcos Iris': '07:30',
          'Golden Beach': '07:30',
          'Crocobeach Hotel': '07:30',
          'Marbello Ariaú': '07:30',
          'Hotel Boreas': '07:30',
          'Maly Boutique': '07:30',
          'Hospedaria da praia': '07:30',
          'Beach Vilage': '07:30',
          'Porto Futuro Hotel': '07:30',
          'POUSADA TOCO DO MAR': '07:30',
          'GRAN MAREIRO': '07:30',
          'VILA GALÉ PF': '07:30',
          'HOTEL LITORAL': '07:30',
          'POUSADA ARCOS IRIS': '07:30',
          'Italia Beach': '08:10',
          'Costa do Mar': '08:20',
          'Ideal Praia Hotel': '08:20',
          'Beach Class': '08:20',
          'Hotel Aquarius': '08:20',
          'Pousada Centro e Praia': '08:30',
          'Maré Praia Hotel': '08:25',
          'Sonho Iracema Hostel': '08:20',
          'Aquarius Residence': '08:30',
          'SONATA DE IRACEMA': '08:30',
          'FORT MAR': '08:30',
          'URB HOTEL': '08:20',
          'ECCO HOTEL': '08:20',
          'VILLA PARK': '08:00',
          'PORTAL DA PRAIA': '08:30',
          'OCEAN PRAIA': '08:20',
          'FORTAL VILLA PRAIA': '08:20',
          'ALGARVE': '08:30',
          'ALBERGARIA HOSTEL': '08:20',
          'HOTEL CASA DE PRAIA': '08:20',
          'HOTEL CASA BLANCA': '08:20',
          'PLAZA PRAIA': '08:20',
          'FLAT CLASSIC': '08:20',
          'IBIS BUDGET': '08:30',
          'ROTORUA INN': '08:20',
          'PRAIA CENTRO': '08:20',
          'MAREDOMUS': '08:20',
          'IRACEMA TRAVEL': '08:20',
          'IBIS PRAIA DE IRACEMA': '08:20',
          'CARPPA/TINTTO': '08:25',
          'HOLIDAY INN': '08:20',
          'HOTEL DIOGO': '08:10',
          'MAGNA PRAIA': '08:20',
          'Ocean Tower Flat': '07:50',
          'Iracema Residence flats': '07:50',
          'GRAN MARQUISE': '07:50',
          'NOBILE SUITES GOLDEN FORTAL.': '07:50',
          'IATE PLAZA': '07:50',
          'PAULI HOTEL': '07:50',
          'Kalango Hostel': '08:35',
          'Marina Park': '08:35',
          'Hotel Meridional': '08:35',
          'REFUGIO HOSTEL': '08:35',
          'Hotel Fortaleza Inn': '08:10',
          'Bristol Jangada': '08:10',
          'Hotel Praia Mar': '08:10',
          'My Way - Helbor': '08:10',
          'LANDSCAPE': '08:10',
          'FORTALEZ A INN': '08:10',
          'HOTEL PRAIANO': '08:10',
          'BOURBON': '08:10',
          'BRASIL TROPICAL': '08:10',
          'BLUE TREE': '08:10',
          'SEARA': '08:10',
          'MAREIRO': '08:10',
          'LUZEIROS': '08:10',
          'VILLA MAYOR': '08:10',
          'HOTEL OASIS': '08:10'
        },
        // Praia de Águas Belas
        'Praia de Águas Belas': {
          'Pous. Arcos Iris': '08:30',
          'Golden Beach': '08:30',
          'Crocobeach Hotel': '08:30',
          'Marbello Ariaú': '08:30',
          'Hotel Boreas': '08:30',
          'Maly Boutique': '08:30',
          'Hospedaria da praia': '08:30',
          'Beach Vilage': '08:30',
          'Porto Futuro Hotel': '08:30',
          'POUSADA TOCO DO MAR': '08:30',
          'GRAN MAREIRO': '08:30',
          'VILA GALÉ PF': '08:30',
          'HOTEL LITORAL': '08:30',
          'POUSADA ARCOS IRIS': '08:30',
          'Italia Beach': '07:50',
          'Costa do Mar': '07:40',
          'Ideal Praia Hotel': '07:40',
          'Beach Class': '07:40',
          'Hotel Aquarius': '07:40',
          'Pousada Centro e Praia': '07:30',
          'Maré Praia Hotel': '07:35',
          'Sonho Iracema Hostel': '07:40',
          'Aquarius Residence': '07:30',
          'SONATA DE IRACEMA': '07:40',
          'FORT MAR': '07:40',
          'URB HOTEL': '07:40',
          'ECCO HOTEL': '07:40',
          'VILLA PARK': '07:50',
          'PORTAL DA PRAIA': '07:40',
          'OCEAN PRAIA': '07:40',
          'FORTAL VILLA PRAIA': '07:40',
          'ALGARVE': '07:40',
          'ALBERGARIA HOSTEL': '07:40',
          'HOTEL CASA DE PRAIA': '07:40',
          'HOTEL CASA BLANCA': '07:40',
          'PLAZA PRAIA': '07:40',
          'FLAT CLASSIC': '07:40',
          'IBIS BUDGET': '07:30',
          'ROTORUA INN': '07:40',
          'PRAIA CENTRO': '07:40',
          'MAREDOMUS': '07:40',
          'IRACEMA TRAVEL': '07:40',
          'IBIS PRAIA DE IRACEMA': '07:40',
          'CARPPA/TINTTO': '07:45',
          'HOLIDAY INN': '07:40',
          'HOTEL DIOGO': '07:50',
          'MAGNA PRAIA': '07:40',
          'Ocean Tower Flat': '08:10',
          'Iracema Residence flats': '08:00',
          'GRAN MARQUISE': '08:00',
          'NOBILE SUITES GOLDEN FORTAL.': '08:00',
          'IATE PLAZA': '08:10',
          'PAULI HOTEL': '08:10',
          'Kalango Hostel': '07:20',
          'Marina Park': '07:20',
          'Hotel Meridional': '07:20',
          'REFUGIO HOSTEL': '07:20',
          'Hotel Fortaleza Inn': '08:00',
          'Bristol Jangada': '08:00',
          'Hotel Praia Mar': '08:00',
          'My Way - Helbor': '08:00',
          'LANDSCAPE': '08:00',
          'FORTALEZ A INN': '08:00',
          'HOTEL PRAIANO': '08:00',
          'BOURBON': '07:50',
          'BRASIL TROPICAL': '08:00',
          'BLUE TREE': '08:00',
          'SEARA': '08:00',
          'MAREIRO': '07:50',
          'LUZEIROS': '08:00',
          'VILLA MAYOR': '08:00',
          'HOTEL OASIS': '08:00'
        },
        // Transfer Beach Park
        'Transfer Beach Park': {
          'Pous. Arcos Iris': '10:00',
          'Golden Beach': '10:00',
          'Crocobeach Hotel': '10:00',
          'Marbello Ariaú': '10:00',
          'Hotel Boreas': '10:00',
          'Maly Boutique': '10:00',
          'Hospedaria da praia': '10:00',
          'Beach Vilage': '10:00',
          'Porto Futuro Hotel': '10:00',
          'POUSADA TOCO DO MAR': '09:50',
          'GRAN MAREIRO': '10:00',
          'VILA GALÉ PF': '10:00',
          'HOTEL LITORAL': '10:00',
          'POUSADA ARCOS IRIS': '10:00',
          'Italia Beach': '09:15',
          'Costa do Mar': '09:10',
          'Ideal Praia Hotel': '09:10',
          'Beach Class': '09:10',
          'Hotel Aquarius': '09:10',
          'Pousada Centro e Praia': '09:00',
          'Maré Praia Hotel': '09:10',
          'Sonho Iracema Hostel': '09:10',
          'Aquarius Residence': '09:00',
          'SONATA DE IRACEMA': '09:10',
          'FORT MAR': '09:10',
          'URB HOTEL': '09:10',
          'ECCO HOTEL': '09:10',
          'VILLA PARK': '09:20',
          'PORTAL DA PRAIA': '09:10',
          'OCEAN PRAIA': '09:10',
          'FORTAL VILLA PRAIA': '09:10',
          'ALGARVE': '09:00',
          'ALBERGARIA HOSTEL': '09:10',
          'HOTEL CASA DE PRAIA': '09:10',
          'HOTEL CASA BLANCA': '09:10',
          'PLAZA PRAIA': '09:15',
          'FLAT CLASSIC': '09:15',
          'IBIS BUDGET': '09:00',
          'ROTORUA INN': '09:10',
          'PRAIA CENTRO': '09:10',
          'MAREDOMUS': '09:10',
          'IRACEMA TRAVEL': '09:10',
          'IBIS PRAIA DE IRACEMA': '09:10',
          'CARPPA/TINTTO': '09:00',
          'HOLIDAY INN': '09:10',
          'HOTEL DIOGO': '09:20',
          'MAGNA PRAIA': '09:10',
          'Ocean Tower Flat': '09:30',
          'Iracema Residence flats': '09:25',
          'GRAN MARQUISE': '09:25',
          'NOBILE SUITES GOLDEN FORTAL.': '09:25',
          'IATE PLAZA': '09:30',
          'PAULI HOTEL': '09:25',
          'Kalango Hostel': '09:00',
          'Marina Park': '09:00',
          'Hotel Meridional': '08:50',
          'REFUGIO HOSTEL': '08:50',
          'Hotel Fortaleza Inn': '09:20',
          'Bristol Jangada': '09:20',
          'Hotel Praia Mar': '09:20',
          'My Way - Helbor': '09:20',
          'LANDSCAPE': '09:20',
          'FORTALEZ A INN': '09:20',
          'HOTEL PRAIANO': '09:25',
          'BOURBON': '09:20',
          'BRASIL TROPICAL': '09:25',
          'BLUE TREE': '09:25',
          'SEARA': '09:25',
          'MAREIRO': '09:20',
          'LUZEIROS': '09:25',
          'VILLA MAYOR': '09:25',
          'HOTEL OASIS': '09:25'
        },
        // Jericoacoara em 1 dia - HORÁRIOS ATUALIZADOS CONFORME PLANILHA FORNECIDA
        'Jericoacoara em 1 dia': {
          'Pous. Arcos Iris': '02:50',
          'Golden Beach': '03:00',
          'Crocobeach Hotel': '03:00',
          'Marbello Ariaú': '03:00',
          'Hotel Boreas': '03:00',
          'Maly Boutique': '03:00',
          'Hospedaria da praia': '03:00',
          'Beach Vilage': '03:00',
          'Porto Futuro Hotel': '03:00',
          'POUSADA TOCO DO MAR': '03:00',
          'GRAN MAREIRO': '03:00',
          'VILA GALÉ PF': '03:00',
          'HOTEL LITORAL': '03:00',
          'POUSADA ARCOS IRIS': '03:00',
          'Italia Beach': '03:20',
          'Costa do Mar': '03:30',
          'Ideal Praia Hotel': '03:30',
          'Beach Class': '03:40',
          'Hotel Aquarius': '03:40',
          'Pousada Centro e Praia': '03:40',
          'Maré Praia Hotel': '03:30',
          'Sonho Iracema Hostel': '03:30',
          'Aquarius Residence': '03:40',
          'SONATA DE IRACEMA': '03:40',
          'FORT MAR': '03:40',
          'URB HOTEL': '03:40',
          'ECCO HOTEL': '03:40',
          'VILLA PARK': '03:30',
          'PORTAL DA PRAIA': '03:40',
          'OCEAN PRAIA': '03:40',
          'FORTAL VILLA PRAIA': '03:40',
          'ALGARVE': '03:40',
          'ALBERGARIA HOSTEL': '03:40',
          'HOTEL CASA DE PRAIA': '03:40',
          'HOTEL CASA BLANCA': '03:40',
          'PLAZA PRAIA': '03:30',
          'FLAT CLASSIC': '03:30',
          'IBIS BUDGET': '03:40',
          'ROTORUA INN': '03:30',
          'PRAIA CENTRO': '03:30',
          'MAREDOMUS': '03:30',
          'IRACEMA TRAVEL': '03:30',
          'IBIS PRAIA DE IRACEMA': '03:30',
          'CARPPA/TINTTO': '03:40',
          'HOLIDAY INN': '03:30',
          'HOTEL DIOGO': '03:20',
          'MAGNA PRAIA': '03:30',
          'Ocean Tower Flat': '03:10',
          'Iracema Residence flats': '03:15',
          'GRAN MARQUISE': '03:15',
          'NOBILE SUITES GOLDEN FORTAL.': '03:15',
          'IATE PLAZA': '03:10',
          'PAULI HOTEL': '03:15',
          'Kalango Hostel': '03:45',
          'Marina Park': '03:45',
          'Hotel Meridional': '03:45',
          'REFUGIO HOSTEL': '03:45',
          'Hotel Fortaleza Inn': '03:20',
          'Bristol Jangada': '03:20',
          'Hotel Praia Mar': '03:20',
          'My Way - Helbor': '03:20',
          'LANDSCAPE': '03:20',
          'FORTALEZ A INN': '03:20',
          'HOTEL PRAIANO': '03:20',
          'BOURBON': '03:20',
          'BRASIL TROPICAL': '03:20',
          'BLUE TREE': '03:20',
          'SEARA': '03:20',
          'MAREIRO': '03:20',
          'LUZEIROS': '03:20',
          'VILLA MAYOR': '03:20',
          'HOTEL OASIS': '03:20'
        }
      };

      if (fortalezaSchedules[selectedService.name] && fortalezaSchedules[selectedService.name][selectedHotel.name]) {
        return fortalezaSchedules[selectedService.name][selectedHotel.name];
      }
    }
    
    // Se chegou até aqui e não encontrou horário específico, retornar erro
    return `❌ HORÁRIO NÃO DISPONÍVEL: Não temos o horário específico para este serviço neste hotel. Por favor, entre em contato com nosso suporte pelo WhatsApp para obter o horário correto.`;
  };

  const handleServiceSelection = (service: Service) => {
    if (service.hasScheduleAlert) {
      setPendingService(service);
      setShowScheduleAlertPopup(true);
    } else {
      setPendingService(service);
      setShowConfirmationPopup(true);
    }
  };

  const handleConfirmService = () => {
    if (pendingService) {
      setSelectedService(pendingService);
      setCurrentStep(2);
    }
    setShowConfirmationPopup(false);
    setPendingService(null);
  };

  const handleCancelService = () => {
    setShowConfirmationPopup(false);
    setPendingService(null);
  };

  const handleScheduleAlertWhatsApp = () => {
    const message = pendingService 
      ? `Olá! Preciso saber o horário de embarque para o serviço: ${pendingService.name}`
      : 'Olá! Preciso saber o horário de embarque para um serviço.';
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowScheduleAlertPopup(false);
    setPendingService(null);
  };

  const handleScheduleAlertBack = () => {
    setShowScheduleAlertPopup(false);
    setPendingService(null);
  };

  const handleOtherServicesWhatsApp = () => {
    const message = 'Olá! Não encontrei o serviço que contratei na lista. Preciso de ajuda para consultar o horário de embarque.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowOtherServicesPopup(false);
  };

  const handleOtherServicesCall = () => {
    window.open(`tel:+${whatsappNumber}`, '_self');
    setShowOtherServicesPopup(false);
  };

  const handleOtherServicesBack = () => {
    setShowOtherServicesPopup(false);
  };

  const handlePrint = () => {
    // Criar uma nova janela para impressão com conteúdo formatado
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const schedule = generateSchedule();
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Sim7 Viagens - Horário de Embarque</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .info-box { border: 2px solid #1E40AF; padding: 20px; margin: 20px 0; }
            .schedule { font-size: 24px; font-weight: bold; color: #1E40AF; text-align: center; }
            .observations { margin-top: 20px; }
            .observations ul { list-style-type: disc; margin-left: 20px; }
            .alert { background-color: #FEF3C7; border: 2px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 8px; }
            .error { background-color: #FEE2E2; border: 2px solid #EF4444; padding: 15px; margin: 20px 0; border-radius: 8px; color: #DC2626; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SIM7 VIAGENS</h1>
            <h2>Horário de Embarque</h2>
          </div>
          <div class="info-box">
            <p><strong>Serviço:</strong> ${selectedService?.name}</p>
            <p><strong>Categoria:</strong> ${selectedService?.category}</p>
            <p><strong>Hotel:</strong> ${selectedHotel?.name}</p>
            <p><strong>Localização:</strong> ${selectedHotel?.zone}</p>
            ${schedule?.includes('Alerta') ? 
              `<div class="alert">${schedule}</div>` : 
              schedule?.includes('❌') ?
              `<div class="error">${schedule}</div>` :
              `<div class="schedule">Horário: ${schedule}</div>`
            }
          </div>
          <div class="observations">
            <h3>Observações Importantes:</h3>
            <ul>
              ${observations.map(obs => `<li>${obs}</li>`).join('')}
            </ul>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <p>WhatsApp: +55 85 99624-1187</p>
            <p>www.sim7viagens.com</p>
          </div>
        </body>
        </html>
      `;
      
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Importação dinâmica do jsPDF
      const { jsPDF } = await import('jspdf');
      
      // Criar nova instância do PDF
      const doc = new jsPDF();
      
      // Configurar fonte
      doc.setFont('helvetica');
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(30, 64, 175); // Azul SIM7
      doc.text('SIM7 VIAGENS', 105, 30, { align: 'center' });
      
      doc.setFontSize(16);
      doc.text('HORÁRIO DE EMBARQUE', 105, 45, { align: 'center' });
      
      // Linha separadora
      doc.setDrawColor(30, 64, 175);
      doc.setLineWidth(1);
      doc.line(20, 55, 190, 55);
      
      // Informações do serviço
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      let yPosition = 75;
      
      doc.setFont('helvetica', 'bold');
      doc.text('INFORMAÇÕES DO SERVIÇO:', 20, yPosition);
      yPosition += 15;
      
      doc.setFont('helvetica', 'normal');
      doc.text(`Serviço: ${selectedService?.name}`, 20, yPosition);
      yPosition += 10;
      
      doc.text(`Categoria: ${selectedService?.category}`, 20, yPosition);
      yPosition += 10;
      
      doc.text(`Hotel: ${selectedHotel?.name}`, 20, yPosition);
      yPosition += 10;
      
      doc.text(`Localização: ${selectedHotel?.zone}`, 20, yPosition);
      yPosition += 20;
      
      // Horário em destaque ou alerta
      const schedule = generateSchedule();
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      
      if (schedule?.includes('Alerta')) {
        doc.setTextColor(255, 140, 0); // Laranja para alerta
        const lines = doc.splitTextToSize(schedule, 170);
        lines.forEach((line: string) => {
          doc.text(line, 105, yPosition, { align: 'center' });
          yPosition += 10;
        });
      } else if (schedule?.includes('❌')) {
        doc.setTextColor(220, 38, 38); // Vermelho para erro
        const lines = doc.splitTextToSize(schedule, 170);
        lines.forEach((line: string) => {
          doc.text(line, 20, yPosition);
          yPosition += 10;
        });
      } else {
        doc.setTextColor(30, 64, 175);
        doc.text(`HORÁRIO DE EMBARQUE: ${schedule}`, 105, yPosition, { align: 'center' });
      }
      yPosition += 25;
      
      // Observações
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('OBSERVAÇÕES IMPORTANTES:', 20, yPosition);
      yPosition += 15;
      
      doc.setFont('helvetica', 'normal');
      observations.forEach((obs, index) => {
        const lines = doc.splitTextToSize(`${index + 1}. ${obs}`, 170);
        lines.forEach((line: string) => {
          doc.text(line, 20, yPosition);
          yPosition += 7;
        });
        yPosition += 3;
      });
      
      // Contato
      yPosition += 15;
      doc.setFont('helvetica', 'bold');
      doc.text('CONTATO:', 20, yPosition);
      yPosition += 10;
      
      doc.setFont('helvetica', 'normal');
      doc.text('WhatsApp: +55 85 99624-1187', 20, yPosition);
      yPosition += 8;
      doc.text('Website: www.sim7viagens.com', 20, yPosition);
      
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text(`Documento gerado em: ${new Date().toLocaleString('pt-BR')}`, 105, 280, { align: 'center' });
      
      // Salvar o PDF
      const fileName = `horario-embarque-sim7-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleWhatsApp = () => {
    const schedule = generateSchedule();
    const message = currentStep === 3 && selectedService && selectedHotel 
      ? `Olá! Tenho uma dúvida sobre meu serviço: ${selectedService.name} - Hotel: ${selectedHotel.name} - Horário: ${schedule}`
      : 'Olá! Tenho uma dúvida sobre os serviços da Sim7 Viagens.';
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedHotel(null);
    setServiceSearch('');
    setHotelSearch('');
    setShowAllServices(false);
    setShowAllHotels(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header - Navbar Simplificada */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo Maior */}
            <div className="flex items-center">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/71d23182-1b1b-40f7-b07c-b72d15e57ed5.png" 
                alt="Sim7 Viagens" 
                className="h-16 sm:h-20 w-auto" 
              />
            </div>
            
            {/* WhatsApp Button */}
            <div className="flex-shrink-0">
              <button
                onClick={handleWhatsApp}
                className="flex items-center space-x-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Segunda Navbar - Barra de Separação */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium">PAINEL DE EMBARQUES SIM7</span>
          </div>
        </div>
      </div>

      {/* Popup de Confirmação */}
      {showConfirmationPopup && pendingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Confirmar Serviço
              </h3>
              <p className="text-gray-600 mb-4">
                Você confirma que este é o serviço correto?
              </p>
              
              {/* Detalhes do serviço selecionado */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">{pendingService.name}</h4>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(pendingService.category)}`}>
                  {pendingService.category}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCancelService}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200 font-medium min-h-[44px]"
              >
                Não, quero revisar
              </button>
              <button
                onClick={handleConfirmService}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 font-medium min-h-[44px]"
              >
                Sim, seguir para o próximo passo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de Alerta de Horário */}
      {showScheduleAlertPopup && pendingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ⚠️ Horário Personalizado
              </h3>
              <p className="text-gray-600 mb-4">
                Este serviço requer contato com nossa equipe para definir o horário de embarque, pois depende do seu voo ou preferência de horário.
              </p>
              
              {/* Detalhes do serviço selecionado */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">{pendingService.name}</h4>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(pendingService.category)}`}>
                  {pendingService.category}
                </span>
                <p className="text-sm text-orange-700 mt-2">
                  Por favor, entre em contato com nossa equipe para agendar seu horário.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleScheduleAlertBack}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200 font-medium min-h-[44px]"
              >
                Voltar
              </button>
              <button
                onClick={handleScheduleAlertWhatsApp}
                className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-200 font-medium min-h-[44px] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com nossa equipe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup "Outros Serviços" */}
      {showOtherServicesPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Não achou o produto que você contratou aqui?
              </h3>
              <p className="text-gray-600 mb-4">
                Entre em contato com o nosso time agora para obter ajuda personalizada com seu serviço.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleOtherServicesWhatsApp}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-200 font-medium min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={handleOtherServicesCall}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 font-medium min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                Ligar
              </button>
              <button
                onClick={handleOtherServicesBack}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200 font-medium min-h-[44px]"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                currentStep >= step 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            {currentStep === 1 && (
              <>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                Escolha seu Serviço
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                Selecione seu Hotel
              </>
            )}
            {currentStep === 3 && (
              <>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Timer className="w-6 h-6 text-green-600" />
                </div>
                Horário de Embarque
              </>
            )}
          </h2>
          <p className="text-gray-600">
            {currentStep === 1 && 'Selecione o serviço que você contratou'}
            {currentStep === 2 && 'Informe onde você está hospedado'}
            {currentStep === 3 && 'Confirme os detalhes do seu embarque'}
          </p>
        </div>

        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Card principal com serviços */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="text-gray-400 w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar serviço... (ex: transfer, jericoacoara, passeio)"
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
                  />
                </div>
                {serviceSearch && (
                  <p className="mt-2 text-sm text-gray-600">
                    {filteredServices.length} serviço(s) encontrado(s)
                  </p>
                )}
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {servicesToShow.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelection(service)}
                    className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left group min-h-[44px]"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                        {service.category}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>
                  </button>
                ))}
              </div>

              {/* Show More/Less Button */}
              {!serviceSearch && (
                <div className="text-center">
                  <button
                    onClick={() => setShowAllServices(!showAllServices)}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 min-h-[44px]"
                  >
                    <CheckSquare className="w-3 h-3" />
                    <span>{showAllServices ? 'Ver menos serviços' : 'Ver todos os serviços'}</span>
                    {showAllServices ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Card "Outros Serviços" */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl shadow-lg p-6 md:p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Não encontrou seu serviço?
                </h3>
                <p className="text-gray-600 mb-6">
                  Temos vários outros serviços disponíveis. Entre em contato conosco para consultar o horário do seu embarque.
                </p>
                <button
                  onClick={() => setShowOtherServicesPopup(true)}
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium min-h-[44px]"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>Ver mais Informações</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Hotel Selection */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Informação sobre filtro por localização */}
            {selectedService && selectedService.departureLocation && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Filtro Aplicado</h4>
                </div>
                <p className="text-blue-800 text-sm">
                  Mostrando apenas hotéis de <strong>{selectedService.departureLocation}</strong> para o serviço selecionado: <strong>{selectedService.name}</strong>
                </p>
              </div>
            )}

            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="text-gray-400 w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar hotel por nome ou bairro..."
                  value={hotelSearch}
                  onChange={(e) => setHotelSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
                />
              </div>
              {hotelSearch && (
                <p className="mt-2 text-sm text-gray-600">
                  {filteredHotels.length} hotel(s) encontrado(s)
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {hotelsToShow.map((hotel) => (
                <button
                  key={hotel.id}
                  onClick={() => {
                    setSelectedHotel(hotel);
                    setCurrentStep(3);
                  }}
                  className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left group min-h-[44px]"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100">
                      <Building className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-gray-600">{hotel.zone}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Show More Hotels Button */}
            {!hotelSearch && filteredHotels.length > 6 && (
              <div className="text-center mb-4">
                <button
                  onClick={() => setShowAllHotels(!showAllHotels)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 min-h-[44px]"
                >
                  <Building className="w-3 h-3" />
                  <span>{showAllHotels ? 'Ver menos hotéis' : 'Ver mais hotéis'}</span>
                  {showAllHotels ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              </div>
            )}

            <button
              onClick={() => setCurrentStep(1)}
              className="text-blue-600 hover:text-blue-700 font-medium min-h-[44px]"
            >
              ← Voltar aos serviços
            </button>
          </div>
        )}

        {/* Step 3: Schedule Display */}
        {currentStep === 3 && selectedService && selectedHotel && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Timer className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Horário Confirmado!
              </h3>
              <p className="text-gray-600">Anote ou salve as informações abaixo</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    Serviço
                  </h4>
                  <p className="text-gray-700">{selectedService.name}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getCategoryColor(selectedService.category)}`}>
                    {selectedService.category}
                  </span>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="w-4 h-4 text-blue-600" />
                    </div>
                    Hotel
                  </h4>
                  <p className="text-gray-700">{selectedHotel.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedHotel.zone}</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Timer className="w-4 h-4 text-green-600" />
                    </div>
                    Horário de Embarque
                  </h4>
                  {generateSchedule()?.includes('Alerta') ? (
                    <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
                      <p className="text-sm text-orange-800 font-medium">
                        {generateSchedule()}
                      </p>
                    </div>
                  ) : generateSchedule()?.includes('❌') ? (
                    <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                      <p className="text-sm text-red-800 font-medium">
                        {generateSchedule()}
                      </p>
                    </div>
                  ) : (
                    <p className="text-4xl font-bold text-blue-600">{generateSchedule()}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Important Information Section */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-3">Observações Importantes</h4>
                  <ul className="space-y-2 text-yellow-700">
                    {observations.map((observation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{observation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 min-h-[44px]"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>Baixar PDF</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={resetForm}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-200 min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Fazer nova consulta</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Harmonizado */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo e Descrição */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/71d23182-1b1b-40f7-b07c-b72d15e57ed5.png" 
                  alt="Sim7 Viagens" 
                  className="h-12 w-auto"
                />
                <span className="text-xl font-bold text-gray-900">Sim7 Viagens</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sua experiência de viagem começa aqui. Consulte horários de embarque de forma rápida e prática.
              </p>
            </div>

            {/* Links Úteis */}
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-2 h-2 text-blue-600" />
                    </div>
                    Transfers
                  </span>
                </li>
                <li>
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-2 h-2 text-green-600" />
                    </div>
                    Passeios
                  </span>
                </li>
                <li>
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                      <CheckSquare className="w-2 h-2 text-purple-600" />
                    </div>
                    Ingressos
                  </span>
                </li>
                <li>
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                      <Timer className="w-2 h-2 text-orange-600" />
                    </div>
                    Experiência
                  </span>
                </li>
                <li>
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Building className="w-2 h-2 text-gray-600" />
                    </div>
                    Pacotes
                  </span>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-gray-900 mb-4">Contato</h4>
              <div className="space-y-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center md:justify-end space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200 mx-auto md:mx-0"
                >
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">WhatsApp</span>
                </button>
                <p className="text-xs text-gray-500">
                  Suporte disponível 24/7
                </p>
              </div>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="border-t border-gray-200 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-500">
                © 2024 Sim7 Viagens. Todos os direitos reservados.
              </p>
              <a
                href="https://www.sim7viagens.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
              >
                Feito por SIM7 com ❤️
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}