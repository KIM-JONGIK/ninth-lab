const scenarioSelect = document.querySelector("#scenario");
const toneSelect = document.querySelector("#tone");
const cardFormatSelect = document.querySelector("#cardFormat");
const energyInput = document.querySelector("#energy");
const energyLabel = document.querySelector("#energyLabel");
const nicknameInput = document.querySelector("#nickname");
const generateBtn = document.querySelector("#generateBtn");
const nativeShareBtn = document.querySelector("#nativeShareBtn");
const copyShareLinkBtn = document.querySelector("#copyShareLinkBtn");
const downloadBtn = document.querySelector("#downloadBtn");
const previewShareBtn = document.querySelector("#previewShareBtn");
const previewCopyLinkBtn = document.querySelector("#previewCopyLinkBtn");
const previewCaptionBtn = document.querySelector("#previewCaptionBtn");
const previewRelayBtn = document.querySelector("#previewRelayBtn");
const previewDownloadBtn = document.querySelector("#previewDownloadBtn");
const lineupBtn = document.querySelector("#lineupBtn");
const dailyApplyBtn = document.querySelector("#dailyApplyBtn");
const dailyCheckInBtn = document.querySelector("#dailyCheckInBtn");
const applyJjalBtn = document.querySelector("#applyJjalBtn");
const copyJjalBtn = document.querySelector("#copyJjalBtn");
const jjalMoodSelect = document.querySelector("#jjalMood");
const jjalCustomInput = document.querySelector("#jjalCustom");
const quickJjalGrid = document.querySelector("#quickJjalGrid");
const quickJjalToggleBtn = document.querySelector("#quickJjalToggleBtn");
const backgroundInputs = document.querySelectorAll('input[name="background"]');
const reactionPulseSection = document.querySelector("#reaction-pulse");
const reactionPulseList = document.querySelector("#reactionPulseList");
const pulseToggleBtn = document.querySelector("#pulseToggleBtn");
const pulseLeader = document.querySelector("#pulseLeader");
const relayQuestionSelect = document.querySelector("#relayQuestion");
const copyRelayLinkBtn = document.querySelector("#copyRelayLinkBtn");
const makePollCardBtn = document.querySelector("#makePollCardBtn");
const relayBox = document.querySelector("#relayBox");
const relayPrompt = document.querySelector("#relayPrompt");
const relayStatus = document.querySelector("#relayStatus");
const relayHint = document.querySelector("#relayHint");
const cardHistoryList = document.querySelector("#cardHistoryList");
const clearHistoryBtn = document.querySelector("#clearHistoryBtn");
const timelineBtn = document.querySelector("#timelineBtn");
const weeklyRecapBtn = document.querySelector("#weeklyRecapBtn");
const historyToggleBtn = document.querySelector("#historyToggleBtn");
const safetyMessage = document.querySelector("#safetyMessage");
const safeCheckList = document.querySelector("#safeCheckList");
const shareCard = document.querySelector("#shareCard");
const cardKicker = document.querySelector("#cardKicker");
const cardTitle = document.querySelector("#cardTitle");
const cardPhrase = document.querySelector("#cardPhrase");
const cardTags = document.querySelector("#cardTags");
const cardFooter = document.querySelector("#cardFooter");
const lineupList = document.querySelector("#lineupList");
const toast = document.querySelector("#toast");
const dailyDate = document.querySelector("#dailyDate");
const dailyMoodTitle = document.querySelector("#dailyMoodTitle");
const dailyMoodCopy = document.querySelector("#dailyMoodCopy");
const dailyMoodChips = document.querySelector("#dailyMoodChips");
const dailyPrompt = document.querySelector("#dailyPrompt");
const dailyQuestion = document.querySelector("#dailyQuestion");
const dailyHash = document.querySelector("#dailyHash");
const dailyList = document.querySelector(".daily-list");
const attendanceStatus = document.querySelector("#attendanceStatus");
const challengeStatus = document.querySelector("#challengeStatus");
const challengeMeter = document.querySelector("#challengeMeter");
const challengeHint = document.querySelector("#challengeHint");
const challengeRecapBtn = document.querySelector("#challengeRecapBtn");
const missionChoice = document.querySelector(".mission-choice");
const installAppBtn = document.querySelector("#installAppBtn");
const installStatus = document.querySelector("#installStatus");
const inviteToneSelect = document.querySelector("#inviteTone");
const invitePreview = document.querySelector("#invitePreview");
const copyInviteBtn = document.querySelector("#copyInviteBtn");
const copyLaunchChecklistBtn = document.querySelector("#copyLaunchChecklistBtn");
const reportTypeSelect = document.querySelector("#reportType");
const reportNoteInput = document.querySelector("#reportNote");
const copyReportBtn = document.querySelector("#copyReportBtn");
const feedbackTypeSelect = document.querySelector("#feedbackType");
const feedbackNoteInput = document.querySelector("#feedbackNote");
const copyFeedbackBtn = document.querySelector("#copyFeedbackBtn");
const dataStats = document.querySelector("#dataStats");
const copyBetaReportBtn = document.querySelector("#copyBetaReportBtn");
const clearLocalDataBtn = document.querySelector("#clearLocalDataBtn");
const fanTypeGrid = document.querySelector("#fanTypeGrid");
const quickStartCardBtn = document.querySelector("#quickStartCardBtn");
const quickStartJjalBtn = document.querySelector("#quickStartJjalBtn");
const quickStartCaptionBtn = document.querySelector("#quickStartCaptionBtn");
const contentSourceCount = document.querySelector("#contentSourceCount");
const surpriseMeBtn = document.querySelector("#surpriseMeBtn");
const rerollBtn = document.querySelector("#rerollBtn");
const appTabs = document.querySelectorAll(".app-tabbar a");
const STADIUM_IMAGE_SRC = "assets/stadium-night.png";
const smoothCenterScroll = { block: "center", behavior: "smooth" };
const smoothStartScroll = { block: "start", behavior: "smooth" };

const scenarios = {
  pregame: {
    label: "시작 전 마음 예열",
    persona: "경기 전 설렘형",
    tag: "마음 예열",
    phrases: {
      hype: [
        "아직 시작 전인데 마음은 벌써 첫 장면을 기다린다.",
        "자리 잡는 순간 오늘의 응원도 함께 켜졌다.",
        "시작 신호보다 팬심이 반 박자 먼저 달린다.",
        "오늘의 첫 박수는 시작보다 조금 일찍 나왔다.",
        "기다리는 몇 분까지 응원 에너지로 바꾸는 중이다.",
      ],
      deadpan: [
        "차분히 보겠다는 다짐은 시작 전에만 유효하다.",
        "물은 준비했고 평정심은 아직 배송 중이다.",
        "아무 일도 없는데 괜히 자세부터 고쳐 앉았다.",
        "알림은 조용한데 마음만 자꾸 앞으로 간다.",
        "편하게 보려고 앉았고 벌써 손에 힘이 들어갔다.",
      ],
      soft: [
        "서두르지 말고 오늘의 설렘부터 천천히 즐긴다.",
        "시작을 기다리는 마음도 충분히 좋은 응원이다.",
        "오늘의 작은 기대를 조용히 옆자리에 앉힌다.",
        "기대가 너무 앞서지 않게 천천히 마음을 데운다.",
        "오늘도 좋아하는 시간을 만날 준비만으로 충분하다.",
      ],
      chaos: [
        "시작 전부터 마음속 회의가 세 번 열렸다.",
        "간식 배치까지 끝났으니 이제 분위기만 오면 된다.",
        "아직 아무 일도 없는데 리액션은 몸을 다 풀었다.",
        "자리, 물, 간식, 마음 순서로 긴급 점검 완료.",
        "아직 시작 전인데 혼자 분위기 전환까지 마쳤다.",
      ],
    },
  },
  chance: {
    label: "기회가 온 것 같은데",
    persona: "기대 선행형",
    tag: "기대 상승",
    phrases: {
      hype: [
        "방금 공기 바뀌었다. 마음이 먼저 앞으로 간다.",
        "지금만큼은 작은 움직임도 크게 믿어본다.",
        "괜히 손에 힘이 들어가는 바로 그 분위기다.",
        "조용하던 마음이 한순간에 응원석으로 변했다.",
        "이 흐름이라면 박수 한 번쯤 먼저 꺼내도 좋다.",
      ],
      deadpan: [
        "기대하지 않는 척했는데 상체가 이미 앞으로 갔다.",
        "침착함은 유지 중이고 손바닥만 바빠졌다.",
        "아직 모른다면서 마음은 이미 다음 장면에 있다.",
        "기대는 안 한다고 말하면서 화면과 거리는 줄었다.",
        "아직 아무것도 아닌데 마음만 확신에 가까워진다.",
      ],
      soft: [
        "조금 기대해도 괜찮다. 좋은 흐름은 천천히 온다.",
        "작은 가능성 하나를 마음 가까이에 두고 본다.",
        "결과보다 지금의 설렘을 먼저 오래 바라본다.",
        "작은 흐름 하나도 오늘은 오래 응원해보고 싶다.",
        "잘 풀리기를 바라는 마음을 조용히 한 칸 올린다.",
      ],
      chaos: [
        "갑자기 소파가 응원석으로 긴급 전환됐다.",
        "작전은 모르겠고 일단 숨부터 크게 들이켠다.",
        "방금부터 눈, 손, 마음이 서로 다른 사인을 낸다.",
        "방금부터 모든 움직임에 혼자 의미를 붙이는 중.",
        "침착하게 보려다 박수 타이밍부터 계산하고 있다.",
      ],
    },
  },
  crisis: {
    label: "마음 수비 시간",
    persona: "긴장 관리형",
    tag: "멘탈 수비",
    phrases: {
      hype: [
        "여기만 지나가면 된다는 마음으로 박수를 모은다.",
        "긴장도 응원의 일부라면 오늘은 아주 뜨겁다.",
        "마음이 흔들릴수록 더 크게 자리를 지킨다.",
        "이 순간을 지나갈 힘까지 응원에 전부 보탠다.",
        "마음이 바빠도 끝까지 자리를 지키는 쪽을 택한다.",
      ],
      deadpan: [
        "표정은 평온하고 손끝만 비상근무 중이다.",
        "괜찮다고 세 번 말했으니 이제 진짜 괜찮아야 한다.",
        "숨은 쉬고 있는데 왜 마음은 대기 화면인가.",
        "괜찮다는 말이 네 번째부터는 주문처럼 들린다.",
        "표정 관리만 성공했고 나머지는 모두 긴장 중이다.",
      ],
      soft: [
        "한 장면씩 지나가면 된다. 마음도 천천히 수비한다.",
        "불안한 순간에도 좋아하는 마음은 자리를 지킨다.",
        "잠깐 눈을 감고 다음 장면을 차분히 기다린다.",
        "지금 필요한 건 정답보다 한 번의 깊은 숨이다.",
        "흔들리는 마음도 잠시 쉬었다 다시 응원하면 된다.",
      ],
      chaos: [
        "마음속 작전판에 선만 열두 개가 생겼다.",
        "물 한 모금이 오늘의 가장 과감한 선택이다.",
        "침착 버튼을 찾다가 리액션 버튼부터 눌렀다.",
        "침착을 찾는 사이 간식 봉지만 세 번 접었다.",
        "머릿속 선택지는 늘었고 손은 괜히 무릎을 잡았다.",
      ],
    },
  },
  afterglow: {
    label: "끝난 뒤 복기 모드",
    persona: "여운 보관형",
    tag: "여운 저장",
    phrases: {
      hype: [
        "끝났는데 마음속 응원은 아직 퇴장하지 않았다.",
        "오늘의 여운까지 챙겨서 기분 좋게 돌아간다.",
        "마지막 장면 뒤에도 박수는 한 번 더 남아 있다.",
        "오늘의 박수는 끝난 뒤에도 마음 안에서 계속된다.",
        "좋았던 기분을 내일 몫까지 조금 남겨두고 간다.",
      ],
      deadpan: [
        "화면은 껐고 복기는 자동 재생 중이다.",
        "이제 자야 하는데 마음이 자꾸 처음으로 돌아간다.",
        "끝난 줄 알았더니 감정만 조용히 연장 중이다.",
        "이제 그만 생각하려 했고 바로 처음부터 떠올렸다.",
        "조용해진 뒤에야 내 리액션이 얼마나 컸는지 안다.",
      ],
      soft: [
        "오늘의 마음을 잘 접어 다음 응원 옆에 둔다.",
        "좋았던 순간 하나만 오래 품고 하루를 마친다.",
        "끝난 뒤의 조용함까지 오늘 야구의 일부로 남긴다.",
        "오늘의 여운을 서두르지 않고 천천히 데려간다.",
        "마음에 남은 한 장면이면 오늘은 충분히 좋았다.",
      ],
      chaos: [
        "복기 세 문장 만에 혼자 토론회가 열렸다.",
        "끝나자마자 다음 응원 계획을 짜는 중이다.",
        "조용해진 방에서 내 리액션만 뒤늦게 다시 울린다.",
        "복기하다가 혼자 다음 편 예고까지 만들었다.",
        "끝난 뒤가 더 바쁜 마음이 오늘도 회의를 연다.",
      ],
    },
  },
  bottom9: {
    label: "9회말 심장 모드",
    persona: "끝내기 낭만파",
    tag: "심장 수비",
    phrases: {
      hype: [
        "오늘 내 심장은 전광판보다 먼저 뛰었다.",
        "끝날 때까지 끝난 척하지 않는 팬력.",
        "목청은 이미 대타로 준비 중이다.",
        "마지막까지 남은 목소리를 오늘 여기에 다 쓴다.",
        "한 번 더 믿는 마음이 지금 가장 큰 응원이다.",
      ],
      deadpan: [
        "평온한 척했지만 손바닥은 이미 연장전.",
        "아무 일 없다는 표정으로 심장만 전력질주 중.",
        "이 정도 긴장은 일상 수비라고 우겨본다.",
        "차분한 척은 끝났고 이제 자세만 겨우 유지한다.",
        "시간은 가는데 마음은 같은 장면에 멈춰 있다.",
      ],
      soft: [
        "천천히 숨 쉬자. 응원은 아직 아웃되지 않았다.",
        "오늘의 마음도 마지막 공까지 같이 간다.",
        "불안해도 괜찮다. 팬심은 원래 큰 타구다.",
        "어떤 끝이 와도 여기까지 함께 본 마음은 남는다.",
        "마지막 순간까지 좋아하는 마음을 천천히 보낸다.",
      ],
      chaos: [
        "작전명은 모르겠고 일단 크게 외친다.",
        "내 안의 작전 회의가 갑자기 소집됐다.",
        "차분하게 보려 했는데 응원석이 먼저 출루했다.",
        "심장은 달리고 머리는 갑자기 모든 경우를 센다.",
        "앉아 있으라는 몸과 일어나려는 마음이 협상 중이다.",
      ],
    },
  },
  rain: {
    label: "비 오는 날 야구 감성",
    persona: "우천취소 멘탈관리형",
    tag: "구름 관전",
    phrases: {
      hype: [
        "비가 와도 마음속 응원석은 매진이다.",
        "우산은 챙겼고 팬심은 방수 처리 완료.",
        "빗소리까지 응원 박자로 들리는 날.",
      ],
      deadpan: [
        "오늘 일정은 취소돼도 과몰입은 정상 영업.",
        "하늘도 쉬라는데 내 머릿속은 이미 라인업.",
        "비 때문에 멈춘 건 경기뿐이라고 믿는다.",
      ],
      soft: [
        "야구 없는 밤도 다음 응원을 데워두는 시간.",
        "젖은 마음은 수건으로, 팬심은 천천히 말리기.",
        "오늘 쉬어가도 내 응원은 다음 날 선발이다.",
      ],
      chaos: [
        "구름 상대로 번트 작전을 고민하는 중.",
        "우천 대기 5분 만에 인생 작전회의 돌입.",
        "빗방울마다 사인을 보내는 기분.",
      ],
    },
  },
  commute: {
    label: "출근길 불펜진",
    persona: "일상 불펜 생존형",
    tag: "출근 등판",
    phrases: {
      hype: [
        "커피가 몸을 풀고 출근길이 마운드에 오른다.",
        "오늘도 지각 위기에서 무실점 퇴근을 노린다.",
        "가방 하나로 하루를 틀어막는 불펜 모드.",
      ],
      deadpan: [
        "출근길 컨디션은 불안하지만 등판은 확정.",
        "아침 회의는 언제나 예고 없는 만루다.",
        "퇴근 전까지 실점만 줄여보자는 마음.",
      ],
      soft: [
        "오늘 하루도 한 타자씩만 상대하자.",
        "느린 출근길에도 마음은 천천히 몸을 푼다.",
        "완벽하지 않아도 등판한 것만으로 충분하다.",
      ],
      chaos: [
        "알람을 놓쳤지만 작전은 방금 짰다.",
        "지하철 환승을 더블플레이처럼 처리하고 싶다.",
        "커피, 가방, 정신줄이 동시에 불펜 투입.",
      ],
    },
  },
  extra: {
    label: "연장전 멘탈 케어",
    persona: "연장전 생존러",
    tag: "멘탈 보강",
    phrases: {
      hype: [
        "피곤한데 이상하게 응원 에너지는 남아 있다.",
        "연장전 같은 하루에도 박수는 아직 유효하다.",
        "버틴 마음이 오늘의 진짜 장타다.",
        "남은 힘이 어디서 왔는지 몰라도 응원은 계속된다.",
        "길어진 시간만큼 오늘의 박수도 더 단단해졌다.",
      ],
      deadpan: [
        "이 하루는 왜 자꾸 승부치기로 가는가.",
        "체력은 바닥인데 표정은 아직 벤치 클리어.",
        "멘탈은 파울, 마감은 페어. 애매하다.",
        "끝날 것 같다는 말만 오늘 여러 번 연장됐다.",
        "체력은 먼저 갔고 마음만 자리를 지키고 있다.",
      ],
      soft: [
        "길어진 하루도 결국 마지막 아웃카운트를 만난다.",
        "잠깐 쉬어도 괜찮다. 응원도 호흡이 필요하다.",
        "오늘은 이기는 것보다 버틴 마음이 더 중요하다.",
        "조금 길어져도 한 장면씩 같이 지나가면 된다.",
        "지친 마음에는 결과보다 따뜻한 마무리가 필요하다.",
      ],
      chaos: [
        "연장 12회 같은 기분으로 간식을 찾는 중.",
        "갑자기 모든 선택지가 대타처럼 보인다.",
        "작전판은 없지만 마음속 선은 많이 그었다.",
        "간식 계획은 끝났고 비상 식량 회의가 시작됐다.",
        "시간 감각을 잃고 응원 자세만 계속 바뀌는 중이다.",
      ],
    },
  },
  dugout: {
    label: "갑자기 명장 빙의",
    persona: "작전판 과몰입형",
    tag: "두뇌 야구",
    phrases: {
      hype: [
        "오늘의 나는 근거 없는 자신감으로 작전을 낸다.",
        "보는 자리만 달라졌지 마음은 이미 더그아웃.",
        "작전 성공률은 몰라도 설명은 제일 길다.",
      ],
      deadpan: [
        "내가 짠 작전은 늘 결과를 보고 완벽해진다.",
        "차분한 분석인 척 사실은 감정 기용.",
        "입으로는 침착, 손은 계속 작전판.",
      ],
      soft: [
        "오늘의 선택도 하나씩 이유를 찾아가면 된다.",
        "큰 그림은 없어도 작은 응원은 정확히 보낸다.",
        "마음의 벤치에서 나에게 사인을 보낸다.",
      ],
      chaos: [
        "갑자기 번트, 갑자기 강공, 갑자기 간식.",
        "작전 회의 3초 만에 직감 야구로 전환.",
        "내 머릿속 수비 시프트가 자꾸 생활까지 번진다.",
      ],
    },
  },
  solo: {
    label: "혼자 보는 날",
    persona: "조용한 과몰입형",
    tag: "혼관 모드",
    phrases: {
      hype: [
        "혼자 봐도 마음속 응원석은 꽉 찼다.",
        "작게 보는 척했지만 리액션은 이미 만원 관중.",
        "방 안에서 조용히 목청을 몸풀게 하는 중.",
      ],
      deadpan: [
        "혼자라서 차분한 줄 알았는데 표정이 먼저 들켰다.",
        "아무도 안 보는데 괜히 자세를 고쳐 앉았다.",
        "혼자 보는 날의 장점은 모든 해설이 내 편이라는 것.",
      ],
      soft: [
        "조용히 보는 응원도 충분히 뜨겁다.",
        "오늘의 작은 박수는 내 방 안에서 오래 울린다.",
        "혼자 있어도 좋아하는 마음은 혼자가 아니다.",
      ],
      chaos: [
        "혼자 관전, 혼자 해설, 혼자 작전 회의까지 완료.",
        "방금 소파가 응원석으로 전환됐다.",
        "말 없는 과몰입이 제일 시끄러운 법.",
      ],
    },
  },
  snack: {
    label: "응원 간식 타임",
    persona: "간식 작전형",
    tag: "먹으면서 응원",
    phrases: {
      hype: [
        "간식이 올라오자 응원 전술도 선명해졌다.",
        "한입 먹고 나니 마음이 바로 출루했다.",
        "오늘의 응원 에너지는 봉지 소리와 함께 온다.",
      ],
      deadpan: [
        "간식은 줄었고 긴장은 늘었다.",
        "입은 바쁜데 마음은 계속 대기 타는 중.",
        "이 정도면 간식도 응원 스태프다.",
      ],
      soft: [
        "천천히 먹고 천천히 응원해도 괜찮다.",
        "좋아하는 맛 하나면 긴장도 조금은 둥글어진다.",
        "오늘은 간식과 마음을 같이 나눠 먹는 날.",
      ],
      chaos: [
        "간식 뜯는 순간 분위기 전환 의식 시작.",
        "작전은 없고 과자는 있다.",
        "손은 간식, 눈은 화면, 마음은 이미 전력질주.",
      ],
    },
  },
  workday: {
    label: "퇴근 후 플레이볼",
    persona: "하루 마감 응원형",
    tag: "퇴근 등판",
    phrases: {
      hype: [
        "오늘 하루 끝나자마자 마음이 바로 몸을 풀었다.",
        "퇴근 후 첫 리액션은 언제나 크게 간다.",
        "업무 모드 종료, 응원 모드 등판.",
      ],
      deadpan: [
        "일은 끝났는데 긴장감은 새로 출근했다.",
        "퇴근했더니 마음이 연장전에 들어갔다.",
        "하루를 버틴 나에게 야구 기분을 지급한다.",
      ],
      soft: [
        "오늘 하루도 여기까지 왔으니 천천히 응원하자.",
        "피곤한 마음을 야구 소리 옆에 내려놓는다.",
        "퇴근 후의 작은 설렘이면 오늘은 충분하다.",
      ],
      chaos: [
        "노트북은 닫았고 마음속 작전판은 열렸다.",
        "집에 오자마자 응원 회의 긴급 소집.",
        "피곤한데 리액션만큼은 풀타임 가능.",
      ],
    },
  },
};

const scenarioKeys = Object.keys(scenarios);

const tones = {
  hype: "응원 과몰입",
  deadpan: "무표정 자조",
  soft: "멘탈 케어",
  chaos: "작전 없는 작전",
};

const cardFormats = {
  classic: { label: "한줄 밈", kicker: "비공식 팬메이드" },
  bulletin: { label: "단톡 속보", kicker: "단톡방 속보 · 창작 상황" },
  status: { label: "상태창", kicker: "팬심 상태창 · 비공식" },
  diary: { label: "관전 일지", kicker: "관전 일지 · 감정만 남김" },
};
const cardFormatKeys = Object.keys(cardFormats);

const energyLabels = {
  1: "관전 모드",
  2: "살짝 몰입",
  3: "응원 예열",
  4: "목청 등판",
  5: "전광판 과열",
};

const unsafePattern =
  /(선수|감독|심판|구단|구단명|팀명|로고|엠블럼|심볼|유니폼|팀컬러|등번호|실명|본명|별명\s*공개|부상|사생활|열애|가족|주소|학교|중계|중계화면|방송화면|방송|캡처|캡쳐|스크린샷|움짤|클립|영상|하이라이트|리플레이|비디오판독|선수사진|프로필사진|공식|오피셜|제휴|인증|협찬|후원|승인|라이선스|라이센스|독점|협회|리그|kbo|kbop|mlb|npb|퓨처스|메이저리그|기록|스코어|박스스코어|경기결과|문자중계|기록실|순위|전적|승률|게임차|연승|연패|매직넘버|타율|평균자책점|방어율|era|ops|war|whip|홈런|타점|안타|도루|세이브|홀드|탈삼진|삼진|qs|lg|엘지|두산|kia|기아|삼성|롯데|한화|ssg|키움|nc|kt|트윈스|베어스|타이거즈|라이온즈|자이언츠|이글스|랜더스|히어로즈|다이노스|위즈|류현진|김광현|양현종|최정|이정후|김혜성|강백호|구자욱|박병호|오타니|저지|트라웃|다르빗슈|욕설|비하발언|비하표현|(?:^|[^가-힣])비하(?:$|[^가-힣])|조롱|죽어|꺼져|패드립|얼굴|사진)/i;
const officialScorePattern = /(\d+\s*[:대-]\s*\d+)|(\d+\s*(승|패|세이브|홀드|홈런|타점|안타|삼진|득점|실점))/i;
const playerNumberPattern = /(등번호\s*\d{1,3})|(\d{1,3}\s*번\s*(선수|투수|타자|에이스|포수|외야수|내야수))/i;
const SHARE_DISCLOSURE = "비공식 팬메이드 · 선수/구단/리그와 무관 · 중계자료 없음 · 공식 기록 아님";
const PUBLIC_BETA_URL = "https://ninth-lab-jkim0428.netlify.app/";

const jjalMoods = {
  pregame: {
    label: "경기 전 설렘",
    title: "오늘도 마음 출석",
    tag: "대기 중",
    tone: "soft",
    energy: 3,
    phrases: [
      "오늘도 심장 예열 완료.",
      "아직 시작도 안 했는데 긴장됨.",
      "자리 잡았다, 마음도 잡았다.",
      "물 한 모금 마셨고 마음은 이미 입장 완료.",
      "시작 전 조용한 설렘이 제일 오래 간다.",
    ],
  },
  chance: {
    label: "찬스 감지",
    title: "여기서 뭐 하나만",
    tag: "기회 냄새",
    tone: "hype",
    energy: 5,
    phrases: [
      "지금 공기 달라졌다.",
      "하나만 부탁드립니다.",
      "괜히 자세 고쳐 앉음.",
      "손끝이 먼저 기대하는 시간.",
      "조용히 있다가 갑자기 몸이 앞으로 감.",
    ],
  },
  danger: {
    label: "위기 관리",
    title: "심장 단속반",
    tag: "멘탈 수비",
    tone: "soft",
    energy: 4,
    phrases: [
      "지금은 숨 크게 쉬는 시간.",
      "아무 일 없던 걸로 가자.",
      "마음의 균형 지키는 중.",
      "잔잔한 표정으로 속만 바쁘다.",
      "오늘의 멘탈은 두 손으로 붙잡는 중.",
    ],
  },
  shift: {
    label: "흐름 전환",
    title: "분위기 갈아타기",
    tag: "반전각",
    tone: "hype",
    energy: 4,
    phrases: [
      "방금 뭔가 넘어왔다.",
      "이제 공기 바뀌는 소리 남.",
      "슬슬 믿어도 되나요.",
      "방금부터 자세가 달라졌다.",
      "괜히 화면 가까이 가는 중.",
    ],
  },
  clutch: {
    label: "숨참기 모드",
    title: "지금 숨참는 중",
    tag: "라이브 반응",
    tone: "hype",
    energy: 5,
    phrases: [
      "방금 공 하나에 내 하루가 흔들렸다.",
      "지금은 물도 못 마심. 혹시 흐름 바뀔까 봐.",
      "말 걸지 마세요. 마음속으로 작전 중입니다.",
      "눈 깜빡이면 뭐가 지나갈 것 같음.",
      "아무 말도 안 하는데 제일 시끄러운 상태.",
    ],
  },
  almost: {
    label: "넘어간 줄 알았는데",
    title: "담장 앞 감정 정지",
    tag: "아깝다",
    tone: "deadpan",
    energy: 4,
    phrases: [
      "넘어간 줄 알았는데 내 기대만 넘어갔다.",
      "소리 질렀고, 머쓱함은 내가 수습한다.",
      "타구는 잡혔고 내 표정은 아직 안 돌아옴.",
      "박수 치려던 손이 공중에서 길을 잃음.",
      "희망이 잠깐 일어났다가 다시 앉았다.",
    ],
  },
  defense: {
    label: "수비가 살렸다",
    title: "방금 수비 미쳤다",
    tag: "글러브 박수",
    tone: "hype",
    energy: 5,
    phrases: [
      "이건 장면 저장 말고 마음 저장.",
      "방금 내 커피까지 같이 잡아준 느낌.",
      "수비 하나로 분위기 환승 완료.",
      "박수부터 나가고 이유는 나중에 따라옴.",
      "방금 마음이 의자에서 살짝 뜸.",
    ],
  },
  walk: {
    label: "산책 출루",
    title: "걸어서 분위기 만들기",
    tag: "눈야구",
    tone: "soft",
    energy: 3,
    phrases: [
      "뛰지 않아도 흐름은 움직인다.",
      "오늘은 기다림도 작전처럼 보이는 날.",
      "조용한 출루가 제일 크게 들릴 때가 있다.",
      "작은 전진도 마음에는 크게 들린다.",
      "천천히 가도 분위기는 따라온다.",
    ],
  },
  review: {
    label: "마음속 판독 중",
    title: "판독보다 빠른 팬심",
    tag: "판독 대기",
    tone: "chaos",
    energy: 4,
    phrases: [
      "화면은 멈췄고 내 심장은 재생 중.",
      "정답 나오기 전까지 모두가 해설위원.",
      "내 마음속 확대 화면은 이미 300배.",
      "잠깐 멈춘 사이 생각만 빨라졌다.",
      "조용한 순간에 과몰입이 제일 커짐.",
    ],
  },
  weather: {
    label: "하늘도 야구 봄",
    title: "구름도 관전 중",
    tag: "날씨 변수",
    tone: "deadpan",
    energy: 2,
    phrases: [
      "비는 내리고 팬심은 대기 타는 중.",
      "하늘이 작전 시간을 너무 길게 쓴다.",
      "우산 들고 멘탈 수비 중.",
      "구름도 오늘 분위기를 쉽게 못 정한다.",
      "기다리는 시간까지 응원으로 쳐준다.",
    ],
  },
  afterglow: {
    label: "경기 후 여운",
    title: "오늘도 야구했다",
    tag: "복기 중",
    tone: "soft",
    energy: 2,
    phrases: [
      "끝났는데 아직 안 끝남.",
      "마음은 아직 경기장.",
      "내일의 나도 또 본다.",
      "조용해졌는데 마음은 아직 켜져 있다.",
      "오늘의 감정은 집까지 같이 간다.",
    ],
  },
};
const jjalMoodKeys = Object.keys(jjalMoods);

const quickJjals = [
  ["pregame", "아직 시작도 안 했는데 긴장됨"],
  ["chance", "지금 공기 달라졌다"],
  ["danger", "아무 일 없던 걸로 가자"],
  ["shift", "슬슬 믿어도 되나요"],
  ["clutch", "말 걸지 마세요 지금 숨참는 중"],
  ["almost", "넘어간 줄 알고 이미 박수침"],
  ["defense", "방금 글러브가 분위기 구함"],
  ["walk", "걸어서 나간 사람 최고"],
  ["review", "내 마음속 판독센터 과부하"],
  ["weather", "하늘도 야구 보느라 고민 중"],
  ["afterglow", "끝났는데 아직 안 끝남"],
  ["pregame", "물 마셨고 마음 입장 완료"],
  ["chance", "몸이 갑자기 앞으로 감"],
  ["danger", "표정만 잔잔하고 속은 바쁨"],
  ["shift", "괜히 화면 가까이 가는 중"],
  ["clutch", "아무 말 없는데 제일 시끄러움"],
  ["almost", "희망이 일어났다가 다시 앉음"],
  ["defense", "박수부터 나가고 이유는 나중"],
  ["walk", "천천히 가도 분위기는 온다"],
  ["review", "멈춘 사이 생각만 빨라짐"],
  ["afterglow", "오늘 감정은 집까지 같이 감"],
];

const dailyPrompts = [
  "공 하나에 하루 기분이 바뀐 순간을 짧게 남기기.",
  "오늘 내 응원석에 붙일 별명을 하나 정하기.",
  "말없이 손에 힘 들어간 장면을 감정만으로 표현하기.",
  "퇴근길 마음을 야구 상황으로 바꿔 적기.",
  "오늘의 나를 타순에 올린다면 몇 번인지 고르기.",
  "친구에게 보낼 무해한 한 줄 응원 만들기.",
  "끝까지 봤다는 사실만으로도 박수 한 번 보내기.",
  "오늘 마음이 제일 크게 움직인 순간을 색으로 표현하기.",
  "소파, 지하철, 책상 중 오늘의 응원석을 고르기.",
  "조용히 과몰입한 티가 나는 행동 하나 적기.",
  "기대, 긴장, 안도 중 지금 가장 가까운 감정을 고르기.",
  "오늘의 리액션을 네 글자 별명으로 만들기.",
  "응원 전 마음을 한 문장으로 정리하기.",
  "친구가 누르면 바로 이해할 감정 버튼 이름 붙이기.",
];

const dailyQuestions = [
  "오늘 내 응원 에너지는 몇 회까지 버틸까?",
  "지금 필요한 건 한 방일까, 멘탈 수비일까?",
  "오늘의 나는 작전형, 해설형, 묵묵한 관중형 중 어디일까?",
  "방금 마음속으로 몇 번이나 작전 회의를 열었을까?",
  "오늘 단톡방에 남길 가장 안전한 리액션은 무엇일까?",
  "기다림도 응원이라면 오늘 몇 점짜리 응원일까?",
  "경기 후에도 남는 감정은 설렘, 안도, 복기 중 어디일까?",
  "오늘 나는 조용한 관찰형일까, 먼저 일어나는 과몰입형일까?",
  "지금 단톡방에 필요한 건 박수, 침착, 웃음 중 무엇일까?",
  "오늘 마음의 응원석은 어디에 가까울까?",
  "카드로 남기고 싶은 감정은 기대, 긴장, 여운 중 무엇일까?",
  "내가 만든 카드가 친구에게 먼저 묻는 질문은 무엇일까?",
  "오늘은 크게 외치는 날일까, 오래 남기는 날일까?",
  "지금 가장 안전하게 공유할 수 있는 반응은 무엇일까?",
];

const dailyHashes = [
  "#비공식팬메이드 #창작상황 #공식기록아님",
  "#캡처없이응원 #야구기분 #팬메이드",
  "#오늘도야구했다 #실명없이 #감정카드",
  "#라이브반응 #중계캡처아님 #팬심퍼센트",
  "#야구밈카드 #안전공유 #로고없음",
  "#마음출석 #창작카드 #비공식팬",
  "#오늘의덕아웃 #감정공유 #안전한밈",
  "#응원루틴 #일상야구 #팬심카드",
  "#캡션복사 #공유준비 #감정짤",
];

const fanTypes = {
  clutch: {
    label: "숨참기형",
    scenario: "bottom9",
    tone: "deadpan",
    energy: 5,
    ratio: "story",
    title: "나는 오늘 숨참기형",
    phrase: "말은 줄이고 마음만 크게 뛰는 관전 타입.",
    tags: ["관전 타입", "긴장 과몰입", "창작 상황", "공식 기록 아님"],
  },
  dugout: {
    label: "작전판형",
    scenario: "dugout",
    tone: "chaos",
    energy: 4,
    ratio: "square",
    title: "나는 오늘 작전판형",
    phrase: "근거는 부족해도 마음속 회의는 이미 열렸다.",
    tags: ["관전 타입", "두뇌 야구", "실명 없음", "창작 상황"],
  },
  snack: {
    label: "간식응원형",
    scenario: "snack",
    tone: "soft",
    energy: 3,
    ratio: "square",
    title: "나는 오늘 간식응원형",
    phrase: "응원은 천천히, 간식은 정확히 준비하는 타입.",
    tags: ["관전 타입", "소파 응원", "로고 없음", "창작 상황"],
  },
  afterwork: {
    label: "퇴근등판형",
    scenario: "workday",
    tone: "hype",
    energy: 4,
    ratio: "wide",
    title: "나는 오늘 퇴근등판형",
    phrase: "하루는 끝났고 마음은 이제 몸을 푼다.",
    tags: ["관전 타입", "일상 야구", "비공식", "창작 상황"],
  },
};
const fanTypeKeys = Object.keys(fanTypes);

const relayQuestions = {
  temperature: "지금 우리 단톡방 온도는?",
  onepick: "지금 제일 가까운 반응은?",
  after: "끝나고 남은 감정은?",
};

const relayReplies = {
  clutch: "지금은 숨참기. 말보다 정적이 더 큰 응원이다.",
  almost: "아깝다 쪽으로 마음이 기울었다. 박수는 이미 나갔다.",
  defense: "내 반응은 수비 박수. 말은 줄이고 박수는 길게 간다.",
  review: "마음속 판독 대기. 모두가 조용히 확대 중이다.",
};

const relayPollMoods = ["clutch", "almost", "defense", "review"];

const reportTypes = {
  rights: "권리물처럼 보임",
  privacy: "실명·사생활 우려",
  abuse: "비방·혐오 표현 우려",
  official: "공식 서비스로 오해될 수 있음",
};

const feedbackTypes = {
  share: "공유가 불편함",
  content: "문구가 더 필요함",
  mobile: "모바일 사용성",
  idea: "새 기능 제안",
};

const inviteTemplates = {
  casual: [
    "야구 감정 카드 만드는 비공식 팬메이드 웹앱 베타 열어봤어.",
    "실명, 로고, 중계 캡처 없이 그냥 오늘 기분만 카드로 만들 수 있음.",
    "하나 만들어보고 이상한 점 있으면 피드백 문구 복사해서 보내줘.",
  ],
  community: [
    "9회말 연구소 베타 테스트 중입니다.",
    "실존 선수·구단·중계자료 없이 야구 팬 감정 카드와 라이브 반응 짤을 만드는 비공식 팬메이드 도구입니다.",
    "공유 편의, 문구 톤, 모바일 사용성 피드백을 받고 있습니다.",
  ],
  tester: [
    "야구 팬 공유 카드 MVP 베타 테스터를 찾습니다.",
    "카드 생성, PNG 저장, 캡션 복사, 로컬 팬심 샘플, 서버 없는 피드백 흐름을 확인해주세요.",
    "권리물이나 개인정보를 넣지 않는 안전한 사용 흐름을 우선 검증합니다.",
  ],
};

const reactionPulseBase = {
  pregame: 8,
  chance: 12,
  danger: 10,
  shift: 9,
  clutch: 18,
  almost: 12,
  defense: 11,
  review: 8,
  walk: 5,
  weather: 3,
  afterglow: 4,
};

const reactionPulseTheme = {
  pregame: "#f0c252",
  chance: "#ffcf5c",
  danger: "#f28f45",
  shift: "#6bd18d",
  clutch: "#f0c252",
  almost: "#d95d39",
  defense: "#3fb56f",
  review: "#5bc7d8",
  walk: "#b8c8bd",
  weather: "#8fa7ff",
  afterglow: "#d7b8ff",
};

const HISTORY_KEY = "ninthLabCardHistory.v1";
const REACTION_KEY = "ninthLabReactionVotes.v1";
const ATTENDANCE_KEY = "ninthLabAttendance.v1";
const PHRASE_DECK_KEY = "ninthLabPhraseDeck.v1";
const MAX_HISTORY_ITEMS = 8;
const HASH_PREFIX = "card=";
const ASK_PREFIX = "ask=";

const lineupPool = [
  ["1번 타자", "아침 커피, 출루율 높음"],
  ["2번 타자", "알림 끄기, 작전 수행형"],
  ["3번 타자", "점심 메뉴, 기대 장타"],
  ["4번 타자", "퇴근, 존재감 압도적"],
  ["5번 타자", "친구의 농담, 분위기 반전"],
  ["6번 타자", "빨래, 수비 범위 넓음"],
  ["7번 타자", "간식, 하위타순의 한 방"],
  ["8번 타자", "소파, 체력 회복 담당"],
  ["9번 타자", "내일의 나, 의외의 출루"],
  ["선발", "해야 할 일, 길게 끌고 감"],
  ["중계", "플레이리스트, 분위기 연결"],
  ["마무리", "침대, 등판 즉시 경기 종료"],
];

let currentState = {
  scenario: "bottom9",
  tone: "hype",
  format: "classic",
  energy: 4,
  ratio: "square",
  nickname: "",
  phrase: scenarios.bottom9.phrases.hype[0],
  background: "stadium",
  moodKey: "",
  jjal: false,
  timelineItems: [],
};

let reactionVotes = {};
let installPromptEvent = null;
let todayMoodKey = "pregame";
let selectedMission = "before";
let activeRelayQuestion = "";
let pendingHistoryUndo = null;
let pulseExpanded = false;
let historyExpanded = false;
let clearLocalDataArmed = false;
let quickJjalExpanded = false;
const imageLoadCache = new Map();
let phraseDeckState = readPhraseDecks();

const missionLabels = {
  before: "경기 전",
  during: "보는 중",
  after: "끝난 뒤",
};

const timelineSlots = ["경기 전", "보는 중", "끝난 뒤"];

const cardBackgrounds = {
  stadium: "야간 구장",
  clay: "흙먼지",
  rain: "우천",
  dugout: "더그아웃",
  neon: "네온 라인",
};
const cardBackgroundKeys = Object.keys(cardBackgrounds);
const cardBackgroundPalettes = {
  clay: [
    [0, "#4b2d20"],
    [0.48, "#945934"],
    [1, "#1d2f27"],
  ],
  rain: [
    [0, "#08151c"],
    [0.52, "#214a58"],
    [1, "#14231f"],
  ],
  dugout: [
    [0, "#0d241f"],
    [0.54, "#264d37"],
    [1, "#16201c"],
  ],
  neon: [
    [0, "#11151f"],
    [0.5, "#183c3d"],
    [1, "#321733"],
  ],
};

const missionPhrases = {
  before: "시작 전부터 마음은 이미 자리에 앉았다.",
  during: "지금 이 순간만큼은 마음이 화면 앞에 붙어 있다.",
  after: "끝난 뒤에도 마음은 천천히 복기 중이다.",
};

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function normalizePhrase(text) {
  return (text || "").replace(/[.!?]+$/g, "").trim();
}

function readPhraseDecks() {
  try {
    const raw = sessionStorage.getItem(PHRASE_DECK_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([key, value]) => typeof key === "string" && Array.isArray(value))
        .map(([key, value]) => [
          key,
          value.filter((item) => typeof item === "string").slice(0, 24),
        ]),
    );
  } catch {
    return {};
  }
}

function writePhraseDecks() {
  try {
    sessionStorage.setItem(PHRASE_DECK_KEY, JSON.stringify(phraseDeckState));
  } catch {
    // Phrase rotation still works in memory when session storage is unavailable.
  }
}

function resetPhraseDecks() {
  phraseDeckState = {};
  try {
    sessionStorage.removeItem(PHRASE_DECK_KEY);
  } catch {
    // Session storage is optional.
  }
}

function nextDeckPhrase(deckKey, items, previousText = "") {
  const source = [...new Set(items.filter((item) => typeof item === "string" && item.trim()))];
  if (!source.length) return "";

  const sourceByNormalized = new Map(source.map((item) => [normalizePhrase(item), item]));
  const used = new Set();
  let remaining = (Array.isArray(phraseDeckState[deckKey]) ? phraseDeckState[deckKey] : [])
    .map((item) => sourceByNormalized.get(normalizePhrase(item)))
    .filter((item) => {
      const normalized = normalizePhrase(item);
      if (!item || used.has(normalized)) return false;
      used.add(normalized);
      return true;
    });

  if (!remaining.length) {
    remaining = shuffle(source);
    const previous = normalizePhrase(previousText);
    const nextIndex = remaining.length - 1;
    if (remaining.length > 1 && normalizePhrase(remaining[nextIndex]) === previous) {
      [remaining[0], remaining[nextIndex]] = [remaining[nextIndex], remaining[0]];
    }
  }

  const phrase = remaining.pop() || source[0];
  phraseDeckState[deckKey] = remaining;
  writePhraseDecks();
  return phrase;
}

function scrollShareCardIntoView() {
  shareCard.scrollIntoView(smoothCenterScroll);
}

function scrollReactionPulseIntoView() {
  reactionPulseSection.scrollIntoView(smoothStartScroll);
}

function getSelectedRatio() {
  const checked = document.querySelector('input[name="ratio"]:checked');
  return checked ? checked.value : "square";
}

function normalizeCardFormat(value) {
  return cardFormats[value] ? value : "classic";
}

function getSelectedCardFormat() {
  return normalizeCardFormat(cardFormatSelect?.value || currentState.format);
}

function formatScenarioCopy(scenario, phrase, formatKey, nickname = "") {
  const safeFormatKey = normalizeCardFormat(formatKey);
  const format = cardFormats[safeFormatKey];
  const titles = {
    classic: scenario.label,
    bulletin: `${scenario.tag} · 방금 알림`,
    status: `현재 상태 · ${scenario.tag}`,
    diary: `${scenario.label} 관전 일지`,
  };

  return {
    title: titles[safeFormatKey] || scenario.label,
    phrase,
    kicker: nickname ? `${nickname} · ${format.label}` : format.kicker,
  };
}

function renderContentInventory() {
  const scenarioPhraseCount = scenarioKeys.reduce(
    (total, key) =>
      total +
      Object.values(scenarios[key].phrases).reduce((toneTotal, phrases) => toneTotal + phrases.length, 0),
    0,
  );
  const livePhraseCount = jjalMoodKeys.reduce(
    (total, key) => total + jjalMoods[key].phrases.length,
    0,
  );
  const sourceCount =
    scenarioPhraseCount +
    livePhraseCount +
    quickJjals.length +
    dailyPrompts.length +
    dailyQuestions.length +
    dailyHashes.length;
  contentSourceCount.textContent = `${sourceCount}개 소스 · ${cardFormatKeys.length}개 문법`;
}

function normalizeBackground(value) {
  return cardBackgrounds[value] ? value : "stadium";
}

function getSelectedBackground() {
  const checked = document.querySelector('input[name="background"]:checked');
  return normalizeBackground(checked?.value || currentState.background);
}

function normalizeSafetyText(value) {
  return String(value || "").normalize("NFKC");
}

function compactSafetyText(value) {
  return normalizeSafetyText(value).replace(/[\s._-]+/g, "");
}

function matchesUnsafePattern(value) {
  const normalized = normalizeSafetyText(value);
  const compact = compactSafetyText(normalized);
  return (
    unsafePattern.test(normalized) ||
    unsafePattern.test(compact) ||
    officialScorePattern.test(normalized) ||
    officialScorePattern.test(compact) ||
    playerNumberPattern.test(normalized) ||
    playerNumberPattern.test(compact)
  );
}

function cleanNickname(value) {
  const compact = normalizeSafetyText(value)
    .replace(/[<>()[\]{}"'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return compact.slice(0, 12);
}

function cleanJjalText(value) {
  return normalizeSafetyText(value)
    .replace(/[<>()[\]{}"`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 34);
}

function nicknameLooksUnsafe(value) {
  return matchesUnsafePattern(value);
}

function textLooksUnsafe(value) {
  return matchesUnsafePattern(value);
}

function stripSafeDisclosureTerms(value) {
  const safeTerms = [
    "선수/구단/리그와 무관",
    "공식 기록 아님",
    "공식기록아님",
    "중계 캡처 아님",
    "중계캡처아님",
    "캡처 없이 만든 짤",
    "캡처없이응원",
    "중계자료 없음",
    "로고 없음",
    "로고없음",
    "실명 없음",
    "실명없이",
    "비공식",
    "FAN-MADE",
    "fan-made",
  ];
  return safeTerms.reduce((text, term) => text.split(term).join(""), String(value || ""));
}

function exportTextLooksUnsafe(value) {
  const checked = stripSafeDisclosureTerms(value);
  return matchesUnsafePattern(checked);
}

function cleanShareText(value, maxLength = 80) {
  return normalizeSafetyText(value)
    .replace(/[<>()[\]{}"`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeTimelineItems(items) {
  if (!Array.isArray(items)) return [];
  return items
    .slice(0, 3)
    .map((item, index) => {
      const slot = cleanShareText(item?.slot || timelineSlots[index] || `${index + 1}컷`, 12);
      const title = cleanShareText(item?.title || "오늘의 야구 기분", 28);
      const phrase = cleanShareText(item?.phrase || "마음만 남긴 창작 카드", 54);
      const tag = cleanShareText(item?.tag || "비공식", 16);
      if (exportTextLooksUnsafe(`${slot} ${title} ${phrase} ${tag}`)) return null;
      return { slot, title, phrase, tag };
    })
    .filter(Boolean);
}

function timelineItemsForState() {
  return sanitizeTimelineItems(currentState.timelineItems);
}

function todaySeed() {
  const now = new Date();
  const key = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  return Array.from(key).reduce((total, char) => total + char.charCodeAt(0), 0);
}

function pickSeeded(items, offset = 0) {
  return items[(todaySeed() + offset) % items.length];
}

function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function previousDateKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return dateKey(date);
}

function readAttendance() {
  try {
    const raw = localStorage.getItem(ATTENDANCE_KEY);
    if (!raw) return { lastDate: "", streak: 0, mission: "before" };
    const parsed = JSON.parse(raw);
    return {
      lastDate: typeof parsed.lastDate === "string" ? parsed.lastDate : "",
      streak: Math.max(0, Number(parsed.streak) || 0),
      mission: missionLabels[parsed.mission] ? parsed.mission : "before",
    };
  } catch {
    return { lastDate: "", streak: 0, mission: "before" };
  }
}

function writeAttendance(value) {
  try {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(value));
  } catch {
    // Attendance is optional local state.
  }
}

function renderDataStats() {
  const attendance = readAttendance();
  const reactionTotal = Object.values(readReactionVotes()).reduce((total, value) => total + Number(value || 0), 0);
  const stats = [
    ["보관함", `${readHistory().length}장`],
    ["팬심 반응", `${reactionTotal}회`],
    ["덕아웃 출석", `${attendance.streak || 0}일`],
  ];

  dataStats.replaceChildren(
    ...stats.map(([label, value]) => {
      const item = document.createElement("span");
      const valueEl = document.createElement("strong");
      valueEl.textContent = value;
      item.append(valueEl, document.createTextNode(label));
      return item;
    }),
  );
}

function countCardsMadeToday(items = readHistory()) {
  const today = dateKey();
  return items.filter((item) => {
    const savedAt = new Date(item.savedAt);
    return !Number.isNaN(savedAt.getTime()) && dateKey(savedAt) === today;
  }).length;
}

function renderChallengeStatus() {
  const items = readHistory();
  const todayCount = countCardsMadeToday(items);
  const totalCards = items.length;
  const recapReady = totalCards >= 3;
  const recapRemaining = Math.max(0, 3 - totalCards);
  const progress = Math.min(100, Math.round((Math.min(totalCards, 3) / 3) * 100));

  challengeStatus.textContent =
    todayCount > 0 ? `오늘 카드 ${todayCount}장 완료` : "오늘의 1장 챌린지 대기 중";
  challengeMeter.style.width = `${progress}%`;
  challengeHint.textContent = recapReady
    ? "주간 감정 결산을 만들 수 있습니다."
    : `주간 감정 결산까지 ${recapRemaining}장 남았습니다.`;
}

function resetClearLocalDataButton() {
  clearLocalDataArmed = false;
  clearLocalDataBtn.classList.remove("is-confirming");
  clearLocalDataBtn.textContent = "로컬 데이터 지우기";
}

function clearLocalData() {
  writeHistory([]);
  reactionVotes = {};
  writeReactionVotes();
  writeAttendance({ lastDate: "", streak: 0, mission: "before" });
  resetPhraseDecks();
  pendingHistoryUndo = null;
  resetClearLocalDataButton();
  renderReactionPulse();
  renderCardHistory();
  updateAttendanceStatus();
  renderDataStats();
  showToast("이 브라우저의 저장 데이터를 지웠습니다.");
}

function updateAttendanceStatus() {
  const attendance = readAttendance();
  if (attendance.lastDate === dateKey()) {
    attendanceStatus.textContent = `오늘 출석 완료 · ${attendance.streak}일째 마음 출석`;
  } else if (attendance.streak > 0) {
    attendanceStatus.textContent = `이전 출석 ${attendance.streak}일 · 오늘도 이어갈 수 있습니다.`;
  } else {
    attendanceStatus.textContent = "오늘 야구 기분을 한 줄만 남기기.";
  }
  renderDataStats();
}

function selectMission(mission) {
  selectedMission = missionLabels[mission] ? mission : "before";
  missionChoice.querySelectorAll("button").forEach((button) => {
    const selected = button.dataset.mission === selectedMission;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-checked", selected ? "true" : "false");
  });
}

function checkInDailyMission() {
  const current = readAttendance();
  const today = dateKey();
  let streak = 1;
  if (current.lastDate === today) {
    streak = Math.max(1, current.streak);
  } else if (current.lastDate === previousDateKey()) {
    streak = Math.max(0, current.streak) + 1;
  }

  const nextAttendance = {
    lastDate: today,
    streak,
    mission: selectedMission,
  };
  writeAttendance(nextAttendance);

  currentState = {
    scenario: "solo",
    tone: "soft",
    format: "diary",
    energy: 3,
    ratio: "story",
    background: getSelectedBackground(),
    nickname: "",
    title: `${streak}일째 마음 출석`,
    kicker: "오늘의 덕아웃",
    phrase: `${missionLabels[selectedMission]} 모드. ${missionPhrases[selectedMission]} 이름 없이 마음만 남기는 중.`,
    tags: ["덕아웃 출석", "로컬 저장", "비공식"],
    moodKey: "",
    jjal: false,
  };

  syncControlsFromState();
  renderShareCard();
  saveCurrentCard();
  updateAttendanceStatus();
  scrollShareCardIntoView();
  showToast("오늘의 덕아웃 출석을 저장했습니다.");
}

function renderDailyDeck() {
  todayMoodKey = pickSeeded(jjalMoodKeys, 2);
  const mood = jjalMoods[todayMoodKey];
  const dailyPhrase = pickSeeded(mood.phrases, 5);
  const date = new Date();

  dailyDate.textContent = `${date.getMonth() + 1}월 ${date.getDate()}일`;
  dailyMoodTitle.textContent = mood.label;
  dailyMoodCopy.textContent = dailyPhrase;
  dailyPrompt.textContent = pickSeeded(dailyPrompts, 9);
  dailyQuestion.textContent = pickSeeded(dailyQuestions, 12);
  dailyHash.textContent = pickSeeded(dailyHashes, 15);
  dailyMoodChips.replaceChildren(
    tagNode(mood.tag),
    tagNode(energyLabels[mood.energy]),
    tagNode("비공식"),
  );
}

function encodeBase64Url(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(text) {
  const normalized = text.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function cardPayload() {
  return {
    scenario: currentState.scenario || "bottom9",
    tone: currentState.tone || "hype",
    format: normalizeCardFormat(currentState.format),
    energy: currentState.energy || 4,
    ratio: currentState.ratio || "square",
    nickname: currentState.nickname || "",
    phrase: currentState.phrase || "",
    title: currentState.title || "",
    kicker: currentState.kicker || "",
    background: normalizeBackground(currentState.background),
    tags: (currentState.tags || []).slice(0, 4),
    moodKey: currentState.moodKey || "",
    jjal: Boolean(currentState.jjal),
    timelineItems: timelineItemsForState(),
  };
}

function shareUrl() {
  const url = new URL(window.location.href);
  url.hash = `${HASH_PREFIX}${encodeBase64Url(JSON.stringify(cardPayload()))}`;
  return url.href;
}

function stateFromPayload(payload) {
  const scenarioKey = scenarios[payload.scenario] ? payload.scenario : "bottom9";
  const tone = tones[payload.tone] ? payload.tone : "hype";
  const format = normalizeCardFormat(payload.format);
  const energy = Math.min(5, Math.max(1, Number(payload.energy) || 4));
  const ratio = ["square", "story", "wide"].includes(payload.ratio) ? payload.ratio : "square";
  const background = normalizeBackground(payload.background);
  const moodKey = jjalMoods[payload.moodKey] ? payload.moodKey : "";
  const scenario = scenarios[scenarioKey];
  const mood = moodKey ? jjalMoods[moodKey] : null;
  const rawPhrase = cleanShareText(payload.phrase, 90);
  const phrase =
    rawPhrase && !textLooksUnsafe(rawPhrase)
      ? rawPhrase
      : mood
        ? pick(mood.phrases)
        : pick(scenario.phrases[tone]);
  const nickname = nicknameLooksUnsafe(payload.nickname || "") ? "" : cleanNickname(payload.nickname || "");
  const formattedCopy = formatScenarioCopy(scenario, phrase, format, nickname);
  const titleCandidate = cleanShareText(payload.title, 36);
  const title =
    titleCandidate && !textLooksUnsafe(titleCandidate)
      ? titleCandidate
      : mood
        ? mood.title
        : formattedCopy.title;
  const kickerCandidate = cleanShareText(payload.kicker, 36);
  const payloadKicker =
    kickerCandidate && !exportTextLooksUnsafe(kickerCandidate) ? kickerCandidate : "";
  const timelineItems = sanitizeTimelineItems(payload.timelineItems);
  const payloadTags = Array.isArray(payload.tags)
    ? payload.tags
        .map((tag) => cleanShareText(tag, 16))
        .filter((tag) => tag && !exportTextLooksUnsafe(tag))
        .slice(0, 4)
    : [];
  const tags = timelineItems.length
    ? payloadTags.length
      ? payloadTags
      : ["3컷 타임라인", "감정 로그", "비공식"]
    : mood
      ? [mood.label, mood.tag, "중계 캡처 아님"]
      : [cardFormats[format].label, energyLabels[energy], scenario.tag, "창작 상황"];

  return {
    scenario: scenarioKey,
    tone,
    format,
    energy,
    ratio,
    nickname,
    phrase,
    title,
    background,
    kicker: timelineItems.length
      ? cleanShareText(payload.kicker, 28) || "3컷 감정 타임라인"
      : mood
        ? "LIVE FAN-MADE · 캡처 없이 만든 짤"
        : payloadKicker || formattedCopy.kicker,
    tags,
    moodKey,
    jjal: Boolean(payload.jjal && mood),
    timelineItems,
  };
}

function syncControlsFromState() {
  const ratioInput = document.querySelector(`input[name="ratio"][value="${currentState.ratio}"]`);
  if (ratioInput) ratioInput.checked = true;
  const backgroundInput = document.querySelector(
    `input[name="background"][value="${normalizeBackground(currentState.background)}"]`,
  );
  if (backgroundInput) backgroundInput.checked = true;
  scenarioSelect.value = currentState.scenario;
  toneSelect.value = currentState.tone;
  cardFormatSelect.value = normalizeCardFormat(currentState.format);
  energyInput.value = String(currentState.energy);
  energyLabel.textContent = String(currentState.energy);
  nicknameInput.value = currentState.nickname;
  if (currentState.moodKey && jjalMoods[currentState.moodKey]) {
    jjalMoodSelect.value = currentState.moodKey;
  }
}

function restoreCardFromHash() {
  if (!window.location.hash.startsWith(`#${HASH_PREFIX}`)) return false;
  try {
    const encoded = window.location.hash.slice(HASH_PREFIX.length + 1);
    const payload = JSON.parse(decodeBase64Url(encoded));
    currentState = stateFromPayload(payload);
    syncControlsFromState();
    renderShareCard();
    if (currentState.moodKey) renderReactionPulse(currentState.moodKey);
    showToast("공유 링크의 카드를 열었습니다.");
    return true;
  } catch {
    return false;
  }
}

function relayUrl() {
  const question = relayQuestions[relayQuestionSelect.value]
    ? relayQuestionSelect.value
    : "temperature";
  const url = new URL(window.location.href);
  url.hash = `${ASK_PREFIX}${encodeBase64Url(JSON.stringify({ question }))}`;
  return url.href;
}

function betaHomeUrl() {
  const url = new URL(window.location.href);
  if (["localhost", "127.0.0.1", ""].includes(url.hostname) || url.protocol === "file:") {
    return PUBLIC_BETA_URL;
  }
  url.hash = "";
  return url.href;
}

function buildInviteText() {
  const lines = inviteTemplates[inviteToneSelect.value] || inviteTemplates.casual;
  return ["[9회말 연구소 베타]", ...lines, betaHomeUrl()].join("\n");
}

function renderInvitePreview() {
  invitePreview.textContent = buildInviteText();
}

async function copyInviteText() {
  const ok = await copyTextToClipboard(buildInviteText());
  showToast(ok ? "베타 초대 문구를 복사했습니다." : "초대 문구를 복사하지 못했습니다.");
}

async function copyLaunchChecklist() {
  const text = [
    "[9회말 연구소 공개 베타 체크리스트]",
    "완료: 정적 웹 MVP",
    "완료: 권리·개인정보 보호 고지",
    "완료: 카드 공유 링크, PNG 저장, 캡션 복사",
    "완료: 권리·안전 검토 요청 문구 복사",
    "완료: 베타 피드백 문구 복사",
    "완료: GitHub 저장소 원격 연결",
    "완료: Netlify 자동 배포",
    "완료: 공개 배포물 내부 파일 차단",
    "권장: 첫 테스트 10명에게 초대 문구 전달",
    "권장: 피드백 문구 3개 이상 회수",
    betaHomeUrl(),
  ].join("\n");
  const ok = await copyTextToClipboard(text);
  showToast(ok ? "런칭 체크리스트를 복사했습니다." : "체크리스트를 복사하지 못했습니다.");
}

function applyRelayQuestionCard() {
  const questionKey = relayQuestions[relayQuestionSelect.value]
    ? relayQuestionSelect.value
    : "temperature";
  const question = relayQuestions[questionKey];
  const options = relayPollMoods.map((key, index) => `${index + 1}. ${jjalMoods[key].label}`);

  currentState = {
    scenario: "dugout",
    tone: "hype",
    format: "bulletin",
    energy: 4,
    ratio: "wide",
    background: getSelectedBackground(),
    nickname: "",
    title: question,
    kicker: "단톡방 4지선다",
    phrase: options.join("  "),
    tags: ["서버 없는 질문", "채팅 답변", "비공식"],
    moodKey: "",
    jjal: false,
  };

  syncControlsFromState();
  renderShareCard();
  saveCurrentCard();
  scrollShareCardIntoView();
  showToast("단톡방 4지선다 질문 카드가 만들어졌습니다.");
}

function setRelayQuestion(questionKey) {
  activeRelayQuestion = relayQuestions[questionKey] ? questionKey : "";
  relayBox.classList.toggle("is-answering", Boolean(activeRelayQuestion));
  relayStatus.hidden = !activeRelayQuestion;
  if (activeRelayQuestion) {
    relayQuestionSelect.value = activeRelayQuestion;
    relayPrompt.textContent = `친구의 덕아웃 질문: ${relayQuestions[activeRelayQuestion]}`;
    relayStatus.textContent = "받은 질문에 답장 중입니다. 위 반응 버튼 하나를 누르면 카드가 만들어집니다.";
    relayHint.textContent = "아래 반응을 누르면 서버 없이 답장 카드가 만들어집니다.";
    copyRelayLinkBtn.textContent = "질문 다시 보내기";
  } else {
    relayPrompt.textContent = "단톡방 반응 릴레이";
    relayStatus.textContent = "";
    relayHint.textContent = "서버 없는 릴레이입니다. 답변은 이 브라우저에만 남습니다.";
    copyRelayLinkBtn.textContent = "친구에게 묻기";
  }
}

function restoreRelayFromHash() {
  if (!window.location.hash.startsWith(`#${ASK_PREFIX}`)) return false;
  try {
    const encoded = window.location.hash.slice(ASK_PREFIX.length + 1);
    const payload = JSON.parse(decodeBase64Url(encoded));
    const question = relayQuestions[payload.question] ? payload.question : "temperature";
    setRelayQuestion(question);
    scrollReactionPulseIntoView();
    showToast("친구의 덕아웃 질문을 열었습니다.");
    return true;
  } catch {
    return false;
  }
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Some embedded browsers expose Clipboard API but deny write permission.
    }
  }
  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.opacity = "0";
  document.body.appendChild(helper);
  helper.select();
  const ok = document.execCommand("copy");
  helper.remove();
  return ok;
}

function generateCard(previousPhrase = "") {
  const scenarioKey = scenarios[scenarioSelect.value] ? scenarioSelect.value : "bottom9";
  const scenario = scenarios[scenarioKey];
  const tone = tones[toneSelect.value] ? toneSelect.value : "hype";
  const format = getSelectedCardFormat();
  const energy = Number(energyInput.value);
  const ratio = getSelectedRatio();
  const rawNickname = nicknameInput.value;
  const safeNickname = nicknameLooksUnsafe(rawNickname) ? "" : cleanNickname(rawNickname);
  const avoidPhrase = typeof previousPhrase === "string" ? previousPhrase : "";
  const phrase = nextDeckPhrase(
    "scenario:" + scenarioKey + ":" + tone,
    scenario.phrases[tone],
    avoidPhrase,
  );
  const formattedCopy = formatScenarioCopy(scenario, phrase, format, safeNickname);

  currentState = {
    scenario: scenarioKey,
    tone,
    format,
    energy,
    ratio,
    background: getSelectedBackground(),
    nickname: safeNickname,
    phrase: formattedCopy.phrase,
    title: formattedCopy.title,
    kicker: formattedCopy.kicker,
    tags: [cardFormats[format].label, energyLabels[energy], scenario.tag, "창작 상황"],
    moodKey: "",
    jjal: false,
  };

  energyLabel.textContent = String(energy);
  renderShareCard();

  if (nicknameLooksUnsafe(rawNickname)) {
    safetyMessage.textContent =
      "별명에 공식명·실명·권리물을 떠올릴 수 있는 단어가 있어 카드에는 익명으로 표시했습니다.";
    safetyMessage.classList.add("is-warning");
  } else {
    safetyMessage.textContent = "실존 인물, 구단, 공식 기록을 특정하지 않는 문구만 생성합니다.";
    safetyMessage.classList.remove("is-warning");
  }
}

function surpriseMe() {
  scenarioSelect.value = pick(scenarioKeys);
  toneSelect.value = pick(Object.keys(tones));
  cardFormatSelect.value = pick(cardFormatKeys);
  energyInput.value = String(1 + Math.floor(Math.random() * 5));
  const ratio = pick(["square", "story", "wide"]);
  const ratioInput = document.querySelector(`input[name="ratio"][value="${ratio}"]`);
  if (ratioInput) ratioInput.checked = true;
  const background = pick(cardBackgroundKeys);
  const backgroundInput = document.querySelector(`input[name="background"][value="${background}"]`);
  if (backgroundInput) backgroundInput.checked = true;
  generateCard(currentState.phrase);
  saveCurrentCard();
  scrollShareCardIntoView();
  showToast("새로운 상황과 밈 문법을 섞었습니다.");
}

function applyFanType(typeKey) {
  const type = fanTypes[typeKey] || fanTypes.clutch;
  currentState = {
    scenario: type.scenario,
    tone: type.tone,
    format: "status",
    energy: type.energy,
    ratio: type.ratio,
    background: getSelectedBackground(),
    nickname: "",
    phrase: type.phrase,
    title: type.title,
    kicker: `10초 관전 타입 · ${type.label}`,
    tags: type.tags,
    moodKey: "",
    jjal: false,
  };

  syncControlsFromState();
  renderShareCard();
  safetyMessage.textContent = "관전 타입 카드는 실존 선수·구단·중계자료 없이 창작 감정만 사용합니다.";
  safetyMessage.classList.remove("is-warning");
  if (saveCurrentCard()) {
    showToast(`${type.label} 카드가 보관함에 저장됐습니다.`);
  } else {
    showToast(`${type.label} 카드가 만들어졌습니다.`);
  }
  scrollShareCardIntoView();
}

function quickStartCard() {
  const typeKey = pick(fanTypeKeys);
  applyFanType(typeKey);
}

function quickStartJjal() {
  const moodKey = pick(["pregame", "chance", "clutch", "almost", "defense", "afterglow"]);
  jjalMoodSelect.value = moodKey;
  jjalCustomInput.value = "";
  applyJjal(moodKey);
  saveCurrentCard();
  scrollShareCardIntoView();
  showToast("바로 공유할 라이브 짤을 만들었습니다.");
}

async function quickStartCaption() {
  applyFanType("clutch");
  await copyCurrentCaption();
}

function renderShareCard() {
  const timelineItems = timelineItemsForState();
  const background = normalizeBackground(currentState.background);
  const format = normalizeCardFormat(currentState.format);
  cardKicker.textContent = currentState.kicker || "비공식 팬메이드";
  cardTitle.textContent = currentState.title || scenarios[currentState.scenario].label;
  cardPhrase.textContent = currentState.phrase;
  cardFooter.textContent = `9회말 연구소 · ${SHARE_DISCLOSURE}`;

  shareCard.querySelector(".timeline-strip")?.remove();
  if (timelineItems.length) {
    const strip = document.createElement("div");
    strip.className = "timeline-strip";
    strip.setAttribute("aria-label", "3컷 감정 타임라인");
    timelineItems.forEach((item) => {
      const article = document.createElement("article");
      const slot = document.createElement("span");
      const title = document.createElement("strong");
      const phrase = document.createElement("p");
      slot.textContent = item.slot;
      title.textContent = item.title;
      phrase.textContent = item.phrase;
      article.append(slot, title, phrase);
      strip.append(article);
    });
    cardTags.before(strip);
  }

  cardTags.replaceChildren(...(currentState.tags || ["창작 상황"]).map(tagNode));

  shareCard.classList.toggle("is-story", currentState.ratio === "story");
  shareCard.classList.toggle("is-wide", currentState.ratio === "wide");
  shareCard.classList.toggle("is-square", currentState.ratio === "square");
  shareCard.classList.toggle("is-jjal", Boolean(currentState.jjal));
  shareCard.classList.toggle("is-timeline", Boolean(timelineItems.length));
  cardFormatKeys.forEach((key) => {
    shareCard.classList.toggle(`format-${key}`, key === format);
  });
  cardBackgroundKeys.forEach((key) => {
    shareCard.classList.toggle(`bg-${key}`, key === background);
  });
  shareCard.dataset.background = background;
  shareCard.dataset.format = format;
  shareCard.dataset.energy = String(currentState.energy || 3);
  renderSafetyChecklist();
}

function renderSafetyChecklist() {
  const phrase = currentState.phrase || "";
  const title = currentState.title || "";
  const tags = (currentState.tags || []).join(" ");
  const timelineText = timelineItemsForState()
    .map((item) => `${item.slot} ${item.title} ${item.phrase} ${item.tag}`)
    .join(" ");
  const cardText = `${title} ${phrase} ${tags} ${timelineText}`;
  const creativeText = `${title} ${phrase} ${timelineText}`;
  const safeItems = [
    textLooksUnsafe(creativeText)
      ? "위험 표현이 감지되면 기본 창작 문구로 대체됩니다."
      : "선수명, 구단명, 로고 없이 감정 문구만 사용 중입니다.",
    "카드와 링크에는 비공식 팬메이드 고지가 포함됩니다.",
    officialScorePattern.test(cardText)
      ? "공식 기록처럼 보이는 숫자 표현은 공유 전 제거가 필요합니다."
      : "스코어, 순위, 공식 기록처럼 보이는 정보가 없습니다.",
    currentState.jjal ? "라이브 짤은 중계 캡처 대신 창작 배경을 사용합니다." : "공유 이미지는 생성 배경과 창작 문구로 구성됩니다.",
  ];

  safeCheckList.replaceChildren(
    ...safeItems.map((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      return item;
    }),
  );
}

function canShareCurrentCard() {
  const exportText = [
    currentState.title || "",
    currentState.phrase || "",
    currentState.kicker || "",
    currentState.nickname || "",
    ...(currentState.tags || []),
    ...timelineItemsForState().flatMap((item) => [item.slot, item.title, item.phrase, item.tag]),
    pulseLeader.textContent || "",
  ].join(" ");
  if (exportTextLooksUnsafe(exportText)) {
    showToast("권리 보호를 위해 실존 선수·구단·중계·공식 기록 표현은 공유할 수 없습니다.");
    return false;
  }
  return true;
}

function readReactionVotes() {
  try {
    const raw = localStorage.getItem(REACTION_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([key, value]) => jjalMoods[key] && Number.isFinite(Number(value)))
        .map(([key, value]) => [key, Math.max(0, Math.min(99, Number(value)))]),
    );
  } catch {
    return {};
  }
}

function writeReactionVotes() {
  try {
    localStorage.setItem(REACTION_KEY, JSON.stringify(reactionVotes));
  } catch {
    // Reaction percentages are optional local state.
  }
}

function applyJjal(moodKey = jjalMoodSelect.value, forcedPhrase = "") {
  const safeMoodKey = jjalMoods[moodKey] ? moodKey : "clutch";
  const mood = jjalMoods[safeMoodKey];
  const rawCustom = forcedPhrase || jjalCustomInput.value;
  const customPhrase = cleanJjalText(rawCustom);
  const safeCustom = customPhrase && !textLooksUnsafe(customPhrase);
  const phrase = safeCustom
    ? customPhrase
    : nextDeckPhrase(
        "jjal:" + safeMoodKey,
        mood.phrases,
        currentState.jjal && currentState.moodKey === safeMoodKey ? currentState.phrase : "",
      );
  addReactionVote(safeMoodKey, 1);
  const moodPercent = getReactionTotals().find((item) => item.key === safeMoodKey)?.percent || 0;

  currentState = {
    scenario: "bottom9",
    tone: mood.tone,
    format: "bulletin",
    energy: mood.energy,
    ratio: "wide",
    background: getSelectedBackground(),
    nickname: "",
    title: mood.title,
    kicker: "LIVE FAN-MADE · 캡처 없이 만든 짤",
    phrase,
    tags: [mood.label, `로컬 샘플 ${moodPercent}%`, "중계 캡처 아님"],
    moodKey: safeMoodKey,
    jjal: true,
  };

  document.querySelector('input[name="ratio"][value="wide"]').checked = true;
  cardFormatSelect.value = "bulletin";
  renderShareCard();
  renderReactionPulse(safeMoodKey);

  if (customPhrase && !safeCustom) {
    safetyMessage.textContent =
      "직접 문구에 실명·권리물·중계 캡처를 떠올릴 수 있는 단어가 있어 기본 문구로 바꿨습니다.";
    safetyMessage.classList.add("is-warning");
  } else {
    safetyMessage.textContent = "라이브 짤은 창작 배경과 짧은 반응 문구만 사용합니다.";
    safetyMessage.classList.remove("is-warning");
  }
}

function getReactionTotals() {
  const totals = Object.entries(reactionPulseBase).map(([key, base]) => ({
    key,
    label: jjalMoods[key].label,
    value: base + (reactionVotes[key] || 0),
  }));
  const sum = totals.reduce((total, item) => total + item.value, 0);
  return totals
    .map((item) => ({
      ...item,
      percent: Math.round((item.value / sum) * 100),
    }))
    .sort((a, b) => b.percent - a.percent);
}

function recordReaction(moodKey, weight = 3) {
  if (!jjalMoods[moodKey]) return;
  addReactionVote(moodKey, weight);
  renderReactionPulse(moodKey);
}

function addReactionVote(moodKey, weight = 3) {
  reactionVotes = {
    ...reactionVotes,
    [moodKey]: Math.min(99, (reactionVotes[moodKey] || 0) + weight),
  };
  writeReactionVotes();
  renderDataStats();
}

function renderReactionPulse(activeMood = "") {
  const totals = getReactionTotals();
  const leader = totals[0];
  pulseLeader.textContent = `내 브라우저 로컬 감정 샘플은 ${leader.label} ${leader.percent}%가 가장 큽니다.`;
  reactionPulseList.classList.toggle("is-compact", !pulseExpanded);
  pulseToggleBtn.textContent = pulseExpanded ? "상위만 보기" : "전체 보기";

  reactionPulseList.replaceChildren(
    ...totals.map((item) => {
      const row = document.createElement("article");
      row.className = "pulse-row";
      row.classList.toggle("is-active", item.key === activeMood);
      row.style.setProperty("--pulse-color", reactionPulseTheme[item.key] || "#f0c252");

      const head = document.createElement("div");
      head.className = "pulse-row-head";

      const label = document.createElement("strong");
      label.textContent = item.label;

      const value = document.createElement("span");
      value.textContent = `${item.percent}%`;

      const bar = document.createElement("div");
      bar.className = "pulse-meter";
      bar.setAttribute("aria-label", `${item.label} ${item.percent}%`);

      const fill = document.createElement("span");
      fill.style.width = `${item.percent}%`;

      head.append(label, value);
      bar.append(fill);
      row.append(head, bar);
      return row;
    }),
  );
}

function renderQuickJjals() {
  quickJjalGrid.classList.toggle("is-compact", !quickJjalExpanded);
  quickJjalToggleBtn.textContent = quickJjalExpanded
    ? "빠른 짤 간단히 보기"
    : `빠른 짤 ${quickJjals.length}개 보기`;
  quickJjalGrid.replaceChildren(
    ...quickJjals.map(([mood, phrase]) => {
      const button = document.createElement("button");
      button.className = "quick-jjal";
      button.type = "button";
      button.dataset.mood = mood;
      button.dataset.phrase = phrase;
      button.textContent = phrase;
      return button;
    }),
  );
}

function readHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY_ITEMS) : [];
  } catch {
    return [];
  }
}

function writeHistory(items) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, MAX_HISTORY_ITEMS)));
    return true;
  } catch {
    return false;
  }
}

function cardSnapshot() {
  const scenario = scenarios[currentState.scenario] || scenarios.bottom9;
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: new Date().toISOString(),
    scenario: currentState.scenario || "bottom9",
    tone: currentState.tone || "hype",
    format: normalizeCardFormat(currentState.format),
    energy: currentState.energy || 4,
    ratio: currentState.ratio || "square",
    background: normalizeBackground(currentState.background),
    nickname: currentState.nickname || "",
    phrase: currentState.phrase || scenario.phrases.hype[0],
    title: currentState.title || scenario.label,
    kicker: currentState.kicker || "비공식 팬메이드",
    tags: (currentState.tags || ["창작 상황", "공식 기록 아님"]).slice(0, 4),
    moodKey: currentState.moodKey || "",
    jjal: Boolean(currentState.jjal),
    timelineItems: timelineItemsForState(),
  };
}

function saveCurrentCard() {
  const next = cardSnapshot();
  const existing = readHistory().filter(
    (item) => `${item.title}|${item.phrase}|${item.ratio}` !== `${next.title}|${next.phrase}|${next.ratio}`,
  );
  const ok = writeHistory([next, ...existing]);
  renderCardHistory();
  return ok;
}

function restoreHistoryCard(item) {
  const scenario = scenarios[item.scenario] || scenarios.bottom9;
  currentState = {
    scenario: item.scenario || "bottom9",
    tone: item.tone || "hype",
    format: normalizeCardFormat(item.format),
    energy: Number(item.energy) || 4,
    ratio: item.ratio || "square",
    background: normalizeBackground(item.background),
    nickname: item.nickname || "",
    phrase: item.phrase || scenarios.bottom9.phrases.hype[0],
    title: item.title || scenario.label,
    kicker: item.kicker || "비공식 팬메이드",
    tags: Array.isArray(item.tags) ? item.tags.slice(0, 4) : ["창작 상황"],
    moodKey: item.moodKey || "",
    jjal: Boolean(item.jjal),
    timelineItems: sanitizeTimelineItems(item.timelineItems),
  };

  const ratioInput = document.querySelector(`input[name="ratio"][value="${currentState.ratio}"]`);
  if (ratioInput) ratioInput.checked = true;
  if (scenarios[currentState.scenario]) scenarioSelect.value = currentState.scenario;
  if (tones[currentState.tone]) toneSelect.value = currentState.tone;
  cardFormatSelect.value = normalizeCardFormat(currentState.format);
  energyInput.value = String(currentState.energy);
  energyLabel.textContent = String(currentState.energy);
  nicknameInput.value = currentState.nickname;
  if (currentState.moodKey && jjalMoods[currentState.moodKey]) {
    jjalMoodSelect.value = currentState.moodKey;
  }

  renderShareCard();
}

function formatSavedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "방금";
  return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

function historyPreviewClass(ratio) {
  if (ratio === "story") return "is-story";
  if (ratio === "wide") return "is-wide";
  return "is-square";
}

function renderCardHistory() {
  const items = readHistory();
  syncWeeklyRecapButton();
  renderDataStats();
  renderChallengeStatus();
  cardHistoryList.classList.toggle("is-compact", !historyExpanded);
  historyToggleBtn.hidden = items.length <= 3;
  historyToggleBtn.textContent = historyExpanded ? "최근 3장만 보기" : `전체 ${items.length}장 보기`;
  if (!items.length) {
    const empty = document.createElement("article");
    empty.className = "history-empty";
    empty.innerHTML =
      "<strong>아직 저장된 카드가 없습니다.</strong><span>카드를 만들면 여기서 다시 열 수 있습니다. 3장을 모으면 감정 결산도 만들 수 있습니다.</span>";
    cardHistoryList.replaceChildren(empty);
    return;
  }

  cardHistoryList.replaceChildren(
    ...items.map((item) => {
      const article = document.createElement("article");
      article.className = "history-item";
      article.dataset.id = item.id;

      const preview = document.createElement("button");
      preview.className = `history-preview ${historyPreviewClass(item.ratio)} bg-${normalizeBackground(item.background)}`;
      preview.type = "button";
      preview.dataset.action = "restore";
      preview.setAttribute(
        "aria-label",
        `${item.title} 카드 열기, ${item.ratio || "square"} 비율, ${formatSavedAt(item.savedAt)} 저장`,
      );

      const previewKicker = document.createElement("span");
      previewKicker.className = "history-kicker";
      previewKicker.textContent = sanitizeTimelineItems(item.timelineItems).length
        ? "3-CUT TIMELINE"
        : item.jjal
          ? "LIVE FAN-MADE"
          : "FAN-MADE";

      const previewTitle = document.createElement("strong");
      previewTitle.textContent = item.title;

      const previewPhrase = document.createElement("span");
      previewPhrase.className = "history-phrase";
      previewPhrase.textContent = item.phrase;

      preview.append(previewKicker, previewTitle, previewPhrase);

      const meta = document.createElement("div");
      meta.className = "history-meta";

      const savedAt = document.createElement("span");
      savedAt.textContent = formatSavedAt(item.savedAt);

      const tags = document.createElement("span");
      tags.textContent = (item.tags || ["비공식 팬메이드"]).slice(0, 2).join(" · ");

      meta.append(savedAt, tags);

      const actions = document.createElement("div");
      actions.className = "history-actions";
      actions.append(
        historyButton("열기", "restore"),
        historyButton("다시", "remix"),
        historyButton("복사", "copy"),
        historyButton("삭제", "delete"),
      );

      article.append(preview, meta, actions);
      return article;
    }),
  );
}

function historyButton(label, action) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.action = action;
  button.textContent = label;
  return button;
}

function findHistoryItem(id) {
  return readHistory().find((item) => item.id === id);
}

function restoreDeletedHistoryItem() {
  if (!pendingHistoryUndo) return;
  const current = readHistory().filter((entry) => entry.id !== pendingHistoryUndo.item.id);
  const next = [...current];
  next.splice(Math.min(pendingHistoryUndo.index, next.length), 0, pendingHistoryUndo.item);
  writeHistory(next);
  pendingHistoryUndo = null;
  renderCardHistory();
  showToast("삭제한 카드를 되돌렸습니다.");
}

async function copyHistoryItem(item) {
  restoreHistoryCard(item);
  await copyCurrentCaption();
}

async function copyJjalText() {
  if (!canShareCurrentCard()) return;
  const leaderText = pulseLeader.textContent ? ` ${pulseLeader.textContent}` : "";
  const text = `[9회말 연구소] ${currentState.title || "오늘의 야구 짤"} - ${
    currentState.phrase
  }${leaderText} (${SHARE_DISCLOSURE})`;
  await copyTextToClipboard(text);
  showToast("커뮤니티용 문구를 복사했습니다.");
}

function hashtagFromTag(tag) {
  const compact = stripSafeDisclosureTerms(tag)
    .replace(/[^0-9A-Za-z가-힣\s]/g, "")
    .replace(/\s+/g, "")
    .trim()
    .slice(0, 18);
  if (!compact || textLooksUnsafe(compact)) return "";
  return `#${compact}`;
}

function buildCommunityCaption() {
  const title = cleanShareText(currentState.title || "오늘의 야구 기분", 40);
  const phrase = cleanShareText(currentState.phrase || "", 90);
  const timelineLines = timelineItemsForState().map((item) => `${item.slot}: ${item.title}`);
  const tags = (currentState.tags || [])
    .map(hashtagFromTag)
    .filter(Boolean)
    .slice(0, 3);
  const hashtags = tags.length ? tags : ["#팬심카드", "#야구기분", "#창작상황"];

  return [
    "[9회말 연구소]",
    title,
    phrase ? `"${phrase}"` : "",
    timelineLines.length ? timelineLines.join(" / ") : "",
    hashtags.join(" "),
    SHARE_DISCLOSURE,
    "이미지는 앱에서 직접 만든 창작 카드입니다.",
    shareUrl(),
  ]
    .filter(Boolean)
    .join("\n");
}

async function copyCurrentCaption() {
  if (!canShareCurrentCard()) return;
  const caption = buildCommunityCaption();
  const safetyText = caption
    .split("\n")
    .filter((line) => !/^https?:\/\//i.test(line))
    .join(" ");
  if (exportTextLooksUnsafe(safetyText)) {
    showToast("캡션에 위험 표현이 남아 있어 복사를 막았습니다.");
    return;
  }
  const ok = await copyTextToClipboard(caption);
  showToast(ok ? "커뮤니티용 캡션을 복사했습니다." : "캡션을 복사하지 못했습니다.");
}

async function copyCurrentShareLink() {
  if (!canShareCurrentCard()) return;
  const url = shareUrl();
  const ok = await copyTextToClipboard(url);
  if (ok) {
    showToast("같은 카드로 열리는 링크를 복사했습니다.", {
      label: "친구에게 묻기",
      handler: () => {
        copyRelayLink().catch(() => showToast("질문 링크를 복사하지 못했습니다."));
      },
    });
  } else {
    window.history.replaceState(null, "", url);
    showToast("복사가 막혀 주소창을 카드 링크로 바꿨습니다.");
  }
}

async function copyRelayLink() {
  const url = relayUrl();
  const text = [
    "[9회말 연구소] 서버 없는 비공식 팬메이드 질문 링크",
    "답변은 각자 브라우저에만 남습니다.",
    SHARE_DISCLOSURE,
    url,
  ].join("\n");
  const ok = await copyTextToClipboard(text);
  if (ok) {
    showToast("친구에게 보낼 덕아웃 질문 링크를 복사했습니다.");
  } else {
    window.history.replaceState(null, "", url);
    showToast("복사가 막혀 주소창을 질문 링크로 바꿨습니다.");
  }
}

async function shareCurrentCard() {
  if (!canShareCurrentCard()) return;
  const url = shareUrl();
  const title = currentState.title || "9회말 연구소";
  const text = `${currentState.phrase || "오늘의 야구 기분"} (${SHARE_DISCLOSURE})`;

  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      showToast("공유 창을 열었습니다.", {
        label: "친구에게 묻기",
        handler: () => {
          copyRelayLink().catch(() => showToast("질문 링크를 복사하지 못했습니다."));
        },
      });
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }

  await copyCurrentShareLink();
}

async function copyReportText() {
  const type = reportTypes[reportTypeSelect.value] || reportTypes.rights;
  const rawNote = cleanShareText(reportNoteInput.value, 120);
  const note = rawNote && !textLooksUnsafe(rawNote) ? rawNote : "구체 대상 없이 권리 또는 안전 우려가 있습니다.";
  const text = [
    "[9회말 연구소 검토 요청]",
    `유형: ${type}`,
    `메모: ${note}`,
    `카드: ${currentState.title || "현재 카드"} / ${currentState.phrase || "문구 없음"}`,
    "요청: 실존 선수·구단·리그·중계자료·공식 기록으로 오해될 여지가 있는지 확인해주세요.",
  ].join("\n");

  await copyTextToClipboard(text);
  showToast("검토 요청 문구를 복사했습니다.");
}

async function copyFeedbackText() {
  const type = feedbackTypes[feedbackTypeSelect.value] || feedbackTypes.share;
  const rawNote = cleanShareText(feedbackNoteInput.value, 160);
  const note = rawNote && !textLooksUnsafe(rawNote) ? rawNote : "개인정보나 권리물 언급 없이 사용성 의견을 남깁니다.";
  const cardText = [currentState.title || "현재 카드", currentState.phrase || "문구 없음"].join(" / ");
  const safeCardText = exportTextLooksUnsafe(cardText) ? "현재 카드 정보 제외" : cardText;
  const text = [
    "[9회말 연구소 베타 피드백]",
    `유형: ${type}`,
    `의견: ${note}`,
    `카드: ${safeCardText}`,
    `브라우저 저장 카드: ${readHistory().length}장`,
    "전송 방식: 사용자가 복사해 직접 전달하는 서버 없는 베타 피드백입니다.",
  ].join("\n");

  await copyTextToClipboard(text);
  showToast("베타 피드백 문구를 복사했습니다.");
}

function nextBetaAction({ cardCount, reactionTotal, attendance }) {
  if (cardCount < 1) return "첫 방문자가 바로 1장 버튼으로 카드를 만들 수 있는지 확인";
  if (cardCount < 3) return "카드 3장까지 만들어 주간 결산 흐름 확인";
  if (reactionTotal < 5) return "팬심 샘플 버튼을 눌러 로컬 반응 확인";
  if (!attendance.lastDate) return "덕아웃 출석 버튼으로 재방문 흐름 확인";
  return "초대 문구를 10명에게 보내고 피드백 문구 회수";
}

async function copyBetaReportText() {
  const items = readHistory();
  const attendance = readAttendance();
  const reactionTotal = Object.values(readReactionVotes()).reduce((total, value) => total + Number(value || 0), 0);
  const topReaction = getReactionTotals()[0];
  const report = [
    "[9회말 연구소 로컬 베타 리포트]",
    `생성일: ${dateKey()}`,
    `보관함 카드: ${items.length}장`,
    `오늘 만든 카드: ${countCardsMadeToday(items)}장`,
    `팬심 반응: ${reactionTotal}회`,
    `가장 큰 감정 샘플: ${topReaction.label} ${topReaction.percent}%`,
    `덕아웃 출석: ${attendance.streak || 0}일`,
    `다음 액션: ${nextBetaAction({ cardCount: items.length, reactionTotal, attendance })}`,
    "범위: 이 브라우저에만 저장된 로컬 상태 기준입니다.",
  ].join("\n");

  const ok = await copyTextToClipboard(report);
  showToast(ok ? "로컬 베타 리포트를 복사했습니다." : "베타 리포트를 복사하지 못했습니다.");
}

function applyRelayAnswer(moodKey) {
  const mood = jjalMoods[moodKey] || jjalMoods.clutch;
  const question = relayQuestions[activeRelayQuestion] || "친구가 덕아웃 질문을 던졌어요.";
  const reply = relayReplies[moodKey] || pick(mood.phrases);
  applyJjal(moodKey, reply);
  currentState.title = `내 반응은 ${mood.label}`;
  currentState.kicker = question;
  currentState.tags = ["답장 카드", mood.tag, "서버 없는 릴레이"];
  renderShareCard();
  saveCurrentCard();
  scrollShareCardIntoView();
  showToast("답장 카드가 만들어졌습니다.");
}

function timelineSourceHistory() {
  return readHistory().filter((item) => !sanitizeTimelineItems(item.timelineItems).length);
}

function syncWeeklyRecapButton() {
  const count = readHistory().length;
  const timelineCount = timelineSourceHistory().length;
  timelineBtn.disabled = timelineCount < 3;
  timelineBtn.textContent = timelineCount < 3 ? `타임라인 ${timelineCount}/3` : "3컷 타임라인";
  weeklyRecapBtn.disabled = count < 3;
  weeklyRecapBtn.textContent = count < 3 ? `결산 ${count}/3` : "주간 결산";
  challengeRecapBtn.disabled = count < 3;
  challengeRecapBtn.textContent = count < 3 ? `결산 ${count}/3` : "주간 결산 만들기";
}

function buildEmotionTimeline() {
  const source = timelineSourceHistory().slice(0, 3);
  if (source.length < 3) {
    showToast("카드 3장을 모으면 3컷 감정 타임라인을 만들 수 있습니다.");
    return;
  }

  const timelineItems = source
    .slice()
    .reverse()
    .map((item, index) => ({
      slot: timelineSlots[index],
      title: cleanShareText(item.title || "오늘의 야구 기분", 28),
      phrase: cleanShareText(item.phrase || "마음만 남긴 창작 카드", 54),
      tag: cleanShareText((item.tags || [item.kicker || "비공식"])[0], 16),
    }));

  currentState = {
    scenario: "solo",
    tone: "soft",
    format: "diary",
    energy: 4,
    ratio: "story",
    background: getSelectedBackground(),
    nickname: "",
    title: "오늘 야구 기분 3컷",
    kicker: "3컷 감정 타임라인",
    phrase: "경기 전부터 끝난 뒤까지, 이름 없이 마음만 모았습니다.",
    tags: ["3컷 타임라인", "감정 로그", "비공식"],
    moodKey: "",
    jjal: false,
    timelineItems,
  };

  syncControlsFromState();
  renderShareCard();
  saveCurrentCard();
  scrollShareCardIntoView();
  showToast("3컷 감정 타임라인 카드가 만들어졌습니다.");
}

function buildWeeklyRecap() {
  const items = readHistory().slice(0, 6);
  if (items.length < 3) {
    showToast("카드 3장을 모으면 주간 감정 결산을 만들 수 있습니다.");
    return;
  }

  const moods = items
    .slice(0, 3)
    .map((item) => (item.tags || [item.title])[0])
    .filter(Boolean);
  const phrase = `${moods.join(", ")}으로 버틴 이번 주 야구 기분. 이름 없이 마음만 모았습니다.`;

  currentState = {
    scenario: "solo",
    tone: "soft",
    format: "diary",
    energy: 3,
    ratio: "story",
    background: getSelectedBackground(),
    nickname: "",
    title: "이번 주 나는 끝까지 봤다",
    kicker: "주간 감정 결산",
    phrase,
    tags: ["감정 결산", `${items.length}장 모음`, "비공식"],
    moodKey: "",
    jjal: false,
  };

  syncControlsFromState();
  renderShareCard();
  saveCurrentCard();
  scrollShareCardIntoView();
  showToast("주간 감정 결산 카드가 만들어졌습니다.");
}

function tagNode(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function renderLineup() {
  const picked = shuffle(lineupPool).slice(0, 9);
  lineupList.replaceChildren(
    ...picked.map(([role, text]) => {
      const item = document.createElement("li");
      const roleEl = document.createElement("strong");
      const textEl = document.createElement("span");
      roleEl.textContent = role;
      textEl.textContent = text;
      item.append(roleEl, textEl);
      return item;
    }),
  );
}

function showToast(message, action = null) {
  toast.replaceChildren();
  const messageEl = document.createElement("span");
  messageEl.textContent = message;
  toast.append(messageEl);

  if (action) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = action.label;
    button.addEventListener("click", () => {
      window.clearTimeout(showToast.timer);
      toast.classList.remove("is-visible");
      action.handler();
    });
    toast.append(button);
  }

  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2300);
}

function loadImage(src) {
  if (imageLoadCache.has(src)) return imageLoadCache.get(src);
  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => {
      imageLoadCache.delete(src);
      reject(error);
    };
    image.src = src;
  });
  imageLoadCache.set(src, promise);
  return promise;
}

function coverDraw(ctx, image, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

function drawCardBase(ctx, image, width, height, background) {
  const key = normalizeBackground(background);
  if (key === "stadium") {
    coverDraw(ctx, image, width, height);
    return;
  }

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  cardBackgroundPalettes[key].forEach(([stop, color]) => gradient.addColorStop(stop, color));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(width * 0.72, height * 0.22, 0, width * 0.72, height * 0.22, width * 0.58);
  glow.addColorStop(0, key === "neon" ? "rgba(91, 199, 216, 0.42)" : "rgba(247, 213, 106, 0.22)");
  glow.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  if (key === "clay") {
    ctx.strokeStyle = "rgba(255, 230, 169, 0.2)";
    ctx.lineWidth = Math.max(4, width * 0.006);
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.2);
    ctx.lineTo(width * 0.78, height * 0.5);
    ctx.lineTo(width * 0.5, height * 0.78);
    ctx.lineTo(width * 0.22, height * 0.5);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 253, 244, 0.08)";
    for (let y = height * 0.18; y < height; y += height * 0.12) {
      ctx.beginPath();
      ctx.moveTo(width * 0.08, y);
      ctx.lineTo(width * 0.92, y + height * 0.05);
      ctx.stroke();
    }
  }

  if (key === "rain") {
    ctx.strokeStyle = "rgba(211, 236, 240, 0.18)";
    ctx.lineWidth = Math.max(2, width * 0.003);
    for (let x = -width * 0.2; x < width * 1.1; x += width * 0.075) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + width * 0.22, height);
      ctx.stroke();
    }
  }

  if (key === "dugout") {
    ctx.strokeStyle = "rgba(255, 253, 244, 0.15)";
    ctx.lineWidth = Math.max(3, width * 0.004);
    for (let y = height * 0.22; y < height * 0.86; y += height * 0.16) {
      ctx.beginPath();
      ctx.moveTo(width * 0.08, y);
      ctx.lineTo(width * 0.92, y);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(8, 18, 16, 0.35)";
    roundRect(ctx, width * 0.1, height * 0.62, width * 0.8, height * 0.18, width * 0.03);
    ctx.fill();
  }

  if (key === "neon") {
    ctx.strokeStyle = "rgba(91, 199, 216, 0.38)";
    ctx.lineWidth = Math.max(4, width * 0.006);
    ctx.beginPath();
    ctx.arc(width * 0.78, height * 0.24, width * 0.18, 0.25, 1.75);
    ctx.stroke();
    ctx.strokeStyle = "rgba(247, 213, 106, 0.26)";
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.78);
    ctx.bezierCurveTo(width * 0.32, height * 0.58, width * 0.6, height * 0.9, width * 0.92, height * 0.65);
    ctx.stroke();
  }
  ctx.restore();
}

function wrapText(ctx, text, maxWidth, maxLines) {
  const chars = Array.from(text);
  const lines = [];
  let line = "";

  for (const char of chars) {
    const nextLine = line + char;
    if (ctx.measureText(nextLine).width > maxWidth && line) {
      lines.push(line.trim());
      line = char;
      if (lines.length === maxLines - 1) break;
    } else {
      line = nextLine;
    }
  }

  if (line && lines.length < maxLines) {
    lines.push(line.trim());
  }

  if (lines.length === maxLines) {
    const lastIndex = lines.length - 1;
    while (ctx.measureText(`${lines[lastIndex]}...`).width > maxWidth && lines[lastIndex].length > 1) {
      lines[lastIndex] = lines[lastIndex].slice(0, -1);
    }
    lines[lastIndex] = `${lines[lastIndex]}...`;
  }

  return lines;
}

function drawTextBlock(ctx, lines, x, y, lineHeight) {
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + lineHeight * index);
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawPill(ctx, text, x, y, scale) {
  ctx.font = `700 ${Math.round(22 * scale)}px "Malgun Gothic", sans-serif`;
  const paddingX = 17 * scale;
  const width = ctx.measureText(text).width + paddingX * 2;
  const height = 42 * scale;
  roundRect(ctx, x, y, width, height, height / 2);
  ctx.fillStyle = "rgba(6, 16, 13, 0.72)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
  ctx.lineWidth = 2 * scale;
  ctx.stroke();
  ctx.fillStyle = "#fffdf4";
  ctx.fillText(text, x + paddingX, y + 28 * scale);
  return width;
}

function drawTimelineDownload(ctx, { width, height, scale, pad, bottom, kicker, title, phrase, timelineItems }) {
  const maxWidth = Math.min(width - pad * 2, 860 * scale);
  const top = pad + 20 * scale;
  const titleSize = Math.round(64 * scale);
  const phraseSize = Math.round(32 * scale);
  let y = top;

  ctx.fillStyle = "#f7d56a";
  ctx.font = `900 ${Math.round(26 * scale)}px "Malgun Gothic", sans-serif`;
  ctx.fillText(kicker, pad, y);
  y += 58 * scale;

  ctx.fillStyle = "#fffdf4";
  ctx.font = `900 ${titleSize}px "Malgun Gothic", sans-serif`;
  const titleLines = wrapText(ctx, title, maxWidth, 2);
  drawTextBlock(ctx, titleLines, pad, y, titleSize * 1.05);
  y += titleLines.length * titleSize * 1.05 + 22 * scale;

  ctx.fillStyle = "#f1f8ec";
  ctx.font = `800 ${phraseSize}px "Malgun Gothic", sans-serif`;
  const phraseLines = wrapText(ctx, phrase, maxWidth, 2);
  drawTextBlock(ctx, phraseLines, pad, y, phraseSize * 1.3);
  y += phraseLines.length * phraseSize * 1.3 + 30 * scale;

  const panelGap = 16 * scale;
  const availableHeight = bottom - y - 150 * scale;
  const panelHeight = Math.max(112 * scale, Math.min(180 * scale, (availableHeight - panelGap * 2) / 3));

  timelineItems.forEach((item, index) => {
    const panelY = y + index * (panelHeight + panelGap);
    roundRect(ctx, pad, panelY, maxWidth, panelHeight, 18 * scale);
    ctx.fillStyle = "rgba(3, 11, 9, 0.68)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
    ctx.lineWidth = 2 * scale;
    ctx.stroke();

    ctx.fillStyle = "#f7d56a";
    ctx.font = `900 ${Math.round(22 * scale)}px "Malgun Gothic", sans-serif`;
    ctx.fillText(item.slot, pad + 22 * scale, panelY + 34 * scale);

    ctx.fillStyle = "#fffdf4";
    ctx.font = `900 ${Math.round(30 * scale)}px "Malgun Gothic", sans-serif`;
    ctx.fillText(item.title, pad + 22 * scale, panelY + 72 * scale);

    ctx.fillStyle = "#dce8dc";
    ctx.font = `800 ${Math.round(23 * scale)}px "Malgun Gothic", sans-serif`;
    const lines = wrapText(ctx, item.phrase, maxWidth - 44 * scale, 2);
    drawTextBlock(ctx, lines, pad + 22 * scale, panelY + 108 * scale, 29 * scale);
  });

  let tagX = pad;
  const tagY = bottom - 92 * scale;
  const tags = currentState.tags?.slice(0, 3) || ["3컷 타임라인", "감정 로그", "비공식"];
  tags.forEach((tag) => {
    const tagWidth = drawPill(ctx, tag, tagX, tagY, scale);
    tagX += tagWidth + 10 * scale;
  });

  ctx.fillStyle = "rgba(255, 253, 244, 0.82)";
  ctx.font = `800 ${Math.round(22 * scale)}px "Malgun Gothic", sans-serif`;
  ctx.fillText(`9회말 연구소 · ${SHARE_DISCLOSURE}`, pad, bottom);
}

async function downloadCard() {
  if (!canShareCurrentCard()) return;
  const ratioSizes = {
    square: [1200, 1200],
    story: [1080, 1920],
    wide: [1600, 900],
  };
  const [width, height] = ratioSizes[currentState.ratio] || ratioSizes.square;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const background = normalizeBackground(currentState.background);
  const image = background === "stadium" ? await loadImage(STADIUM_IMAGE_SRC) : null;
  const scale = width / 1200;
  const scenario = scenarios[currentState.scenario] || scenarios.bottom9;
  const title = currentState.title || scenario.label;
  const phrase = currentState.phrase;
  const kicker =
    currentState.kicker ||
    (currentState.nickname ? `${currentState.nickname}의 오늘 야구 온도` : "비공식 팬메이드");

  drawCardBase(ctx, image, width, height, background);

  const horizontalGradient = ctx.createLinearGradient(0, 0, width, 0);
  horizontalGradient.addColorStop(0, "rgba(3, 12, 10, 0.92)");
  horizontalGradient.addColorStop(0.64, "rgba(3, 12, 10, 0.36)");
  horizontalGradient.addColorStop(1, "rgba(3, 12, 10, 0.62)");
  ctx.fillStyle = horizontalGradient;
  ctx.fillRect(0, 0, width, height);

  const verticalGradient = ctx.createLinearGradient(0, height * 0.28, 0, height);
  verticalGradient.addColorStop(0, "rgba(4, 9, 8, 0)");
  verticalGradient.addColorStop(1, "rgba(4, 9, 8, 0.9)");
  ctx.fillStyle = verticalGradient;
  ctx.fillRect(0, 0, width, height);

  const pad = Math.max(58 * scale, width * 0.06);
  const bottom = height - pad;
  const maxWidth = Math.min(width * 0.7, 780 * scale);
  const isStory = currentState.ratio === "story";
  const titleSize = Math.round((isStory ? 82 : 76) * scale);
  const phraseSize = Math.round((isStory ? 42 : 38) * scale);
  const timelineItems = timelineItemsForState();

  if (timelineItems.length) {
    drawTimelineDownload(ctx, { width, height, scale, pad, bottom, kicker, title, phrase, timelineItems });
  } else {
    ctx.fillStyle = "#f7d56a";
    ctx.font = `900 ${Math.round(28 * scale)}px "Malgun Gothic", sans-serif`;
    ctx.fillText(kicker, pad, bottom - 410 * scale);

    ctx.fillStyle = "#fffdf4";
    ctx.font = `900 ${titleSize}px "Malgun Gothic", sans-serif`;
    const titleLines = wrapText(ctx, title, maxWidth, 3);
    const titleY = bottom - 335 * scale;
    drawTextBlock(ctx, titleLines, pad, titleY, titleSize * 1.05);

    ctx.fillStyle = "#f1f8ec";
    ctx.font = `800 ${phraseSize}px "Malgun Gothic", sans-serif`;
    const phraseY = titleY + titleLines.length * titleSize * 1.05 + 28 * scale;
    const phraseLines = wrapText(ctx, phrase, maxWidth, 3);
    drawTextBlock(ctx, phraseLines, pad, phraseY, phraseSize * 1.35);

    const tags = currentState.tags?.slice(0, 3) || [
      tones[currentState.tone],
      energyLabels[currentState.energy],
      "창작 상황",
    ];
    let tagX = pad;
    let tagY = bottom - 92 * scale;
    tags.forEach((tag) => {
      const tagWidth = drawPill(ctx, tag, tagX, tagY, scale);
      tagX += tagWidth + 10 * scale;
      if (tagX > width - pad - 160 * scale) {
        tagX = pad;
        tagY += 52 * scale;
      }
    });

    ctx.fillStyle = "rgba(255, 253, 244, 0.82)";
    ctx.font = `800 ${Math.round(22 * scale)}px "Malgun Gothic", sans-serif`;
    ctx.fillText(`9회말 연구소 · ${SHARE_DISCLOSURE}`, pad, bottom);
  }

  const filename = `9th-lab-${currentState.ratio}-${Date.now()}.png`;
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) {
        resolve(result);
      } else {
        reject(new Error("Canvas export failed"));
      }
    }, "image/png");
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.download = filename;
  link.href = url;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
  showToast("PNG 카드 저장을 시작했습니다.");
}

function applyDailyMood() {
  const mood = jjalMoods[todayMoodKey] || jjalMoods.pregame;
  const phrase = dailyMoodCopy.textContent || pick(mood.phrases);
  jjalMoodSelect.value = todayMoodKey;
  jjalCustomInput.value = phrase;
  applyJjal(todayMoodKey, phrase);
  saveCurrentCard();
  scrollShareCardIntoView();
  showToast("오늘의 야구 기분을 카드로 만들었습니다.");
}

function applyDailyContentCard(kind) {
  const cardTypes = {
    prompt: {
      title: "오늘의 한 줄",
      kicker: "오늘의 덕아웃",
      phrase: dailyPrompt.textContent || "오늘의 야구 기분을 짧게 남기기.",
      ratio: "story",
      tags: ["오늘 카드", "감정 문구", "비공식"],
      toast: "오늘의 한 줄 카드가 만들어졌습니다.",
    },
    question: {
      title: "오늘의 단톡방 질문",
      kicker: "서버 없는 질문 카드",
      phrase: dailyQuestion.textContent || "지금 제일 가까운 반응은?",
      ratio: "wide",
      tags: ["질문 카드", "각자 브라우저", "비공식"],
      toast: "단톡방 질문 카드가 만들어졌습니다.",
    },
    safe: {
      title: "안전 공유 준비",
      kicker: "비공식 팬메이드",
      phrase: "오늘의 야구 기분만 창작 카드로 공유합니다.",
      ratio: "square",
      tags: ["창작 상황", "팬메이드", "공식 기록 아님"],
      toast: "안전 공유 카드가 만들어졌습니다.",
    },
  };
  const next = cardTypes[kind] || cardTypes.prompt;

  currentState = {
    scenario: "solo",
    tone: kind === "question" ? "hype" : "soft",
    format: kind === "question" ? "bulletin" : "diary",
    energy: kind === "question" ? 4 : 3,
    ratio: next.ratio,
    background: getSelectedBackground(),
    nickname: "",
    title: next.title,
    kicker: next.kicker,
    phrase: next.phrase,
    tags: next.tags,
    moodKey: "",
    jjal: false,
  };

  syncControlsFromState();
  renderShareCard();
  saveCurrentCard();
  scrollShareCardIntoView();
  showToast(next.toast);
}

function setupInstallFlow() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPromptEvent = event;
    installStatus.textContent = "이 브라우저에서는 홈 화면 설치 창을 열 수 있습니다.";
  });

  window.addEventListener("appinstalled", () => {
    installPromptEvent = null;
    installStatus.textContent = "홈 화면에 추가되었습니다.";
    showToast("홈 화면에 추가되었습니다.");
  });
}

async function requestInstall() {
  if (!installPromptEvent) {
    installStatus.textContent = "브라우저 메뉴의 홈 화면에 추가를 사용할 수 있습니다.";
    showToast("브라우저 메뉴에서 홈 화면에 추가를 선택해주세요.");
    return;
  }
  installPromptEvent.prompt();
  const choice = await installPromptEvent.userChoice;
  installPromptEvent = null;
  installStatus.textContent =
    choice.outcome === "accepted" ? "홈 화면 추가가 시작되었습니다." : "설치는 나중에 다시 할 수 있습니다.";
}

function setupAppTabs() {
  if (!appTabs.length || !("IntersectionObserver" in window)) return;
  const sections = Array.from(appTabs)
    .map((tab) => document.querySelector(`#${tab.dataset.tabTarget}`))
    .filter(Boolean);

  const activate = (id) => {
    appTabs.forEach((tab) => {
      const active = tab.dataset.tabTarget === id;
      tab.classList.toggle("is-active", active);
      if (active) {
        tab.setAttribute("aria-current", "page");
      } else {
        tab.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) activate(visible.target.id);
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0.1, 0.4, 0.7],
    },
  );

  sections.forEach((section) => observer.observe(section));
  activate(sections[0]?.id || "generator");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

copyShareLinkBtn.addEventListener("click", () => {
  copyCurrentShareLink().catch(() => {
    showToast("링크를 복사하지 못했습니다. 다시 시도해주세요.");
  });
});

nativeShareBtn.addEventListener("click", () => {
  shareCurrentCard().catch(() => {
    showToast("공유를 시작하지 못했습니다. 링크 복사를 사용해주세요.");
  });
});

previewShareBtn.addEventListener("click", () => {
  shareCurrentCard().catch(() => {
    showToast("공유를 시작하지 못했습니다. 링크 복사를 사용해주세요.");
  });
});

previewCopyLinkBtn.addEventListener("click", () => {
  copyCurrentShareLink().catch(() => {
    showToast("링크를 복사하지 못했습니다. 다시 시도해주세요.");
  });
});

previewCaptionBtn.addEventListener("click", () => {
  copyCurrentCaption().catch(() => {
    showToast("캡션을 복사하지 못했습니다. 다시 시도해주세요.");
  });
});

previewRelayBtn.addEventListener("click", () => {
  copyRelayLink().catch(() => {
    showToast("질문 링크를 복사하지 못했습니다. 다시 시도해주세요.");
  });
});

previewDownloadBtn.addEventListener("click", () => {
  downloadCard().catch(() => {
    showToast("이미지를 저장하지 못했습니다. 다시 시도해주세요.");
  });
});

copyRelayLinkBtn.addEventListener("click", () => {
  copyRelayLink().catch(() => {
    showToast("질문 링크를 복사하지 못했습니다. 다시 시도해주세요.");
  });
});

makePollCardBtn.addEventListener("click", applyRelayQuestionCard);

generateBtn.addEventListener("click", () => {
  generateCard();
  if (saveCurrentCard()) {
    showToast("새 카드가 보관함에 저장됐습니다.");
  } else {
    showToast("새 카드가 만들어졌습니다. 보관함 저장은 건너뛰었습니다.");
  }
  scrollShareCardIntoView();
});

rerollBtn.addEventListener("click", () => {
  generateCard(currentState.phrase);
  scrollShareCardIntoView();
  showToast("같은 설정에서 문구만 바꿨습니다.");
});

surpriseMeBtn.addEventListener("click", surpriseMe);

downloadBtn.addEventListener("click", () => {
  downloadCard().catch(() => {
    showToast("이미지를 저장하지 못했습니다. 다시 시도해주세요.");
  });
});

lineupBtn.addEventListener("click", () => {
  renderLineup();
  showToast("오늘의 타순을 섞었습니다.");
});

dailyApplyBtn.addEventListener("click", applyDailyMood);

dailyList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-daily-card]");
  if (!button) return;
  applyDailyContentCard(button.dataset.dailyCard);
});

dailyCheckInBtn.addEventListener("click", checkInDailyMission);

missionChoice.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mission]");
  if (!button) return;
  selectMission(button.dataset.mission);
});

installAppBtn.addEventListener("click", () => {
  requestInstall().catch(() => {
    showToast("설치 안내를 열지 못했습니다.");
  });
});

applyJjalBtn.addEventListener("click", () => {
  applyJjal();
  scrollShareCardIntoView();
  if (saveCurrentCard()) {
    showToast("라이브 짤을 보관함에 저장했습니다.");
  } else {
    showToast("라이브 짤 카드가 만들어졌습니다.");
  }
});

copyJjalBtn.addEventListener("click", () => {
  copyJjalText().catch(() => {
    showToast("복사하지 못했습니다. 문구를 다시 눌러주세요.");
  });
});

jjalMoodSelect.addEventListener("change", () => {
  applyJjal(jjalMoodSelect.value);
});

fanTypeGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-fan-type]");
  if (!button) return;
  applyFanType(button.dataset.fanType);
});

quickStartCardBtn.addEventListener("click", quickStartCard);

quickStartJjalBtn.addEventListener("click", quickStartJjal);

quickStartCaptionBtn.addEventListener("click", () => {
  quickStartCaption().catch(() => {
    showToast("캡션까지 만드는 흐름을 완료하지 못했습니다.");
  });
});

quickJjalGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".quick-jjal");
  if (!button) return;
  jjalMoodSelect.value = button.dataset.mood;
  jjalCustomInput.value = button.dataset.phrase;
  applyJjal(button.dataset.mood, button.dataset.phrase);
  saveCurrentCard();
  scrollShareCardIntoView();
  showToast("빠른 짤을 카드에 올렸습니다.");
});

quickJjalToggleBtn.addEventListener("click", () => {
  quickJjalExpanded = !quickJjalExpanded;
  renderQuickJjals();
});

cardHistoryList.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  const itemEl = event.target.closest(".history-item");
  if (!target || !itemEl) return;
  const item = findHistoryItem(itemEl.dataset.id);
  if (!item) return;

  const action = target.dataset.action;
  if (action === "restore") {
    restoreHistoryCard(item);
    scrollShareCardIntoView();
    showToast("보관함 카드를 열었습니다.");
  }
  if (action === "remix") {
    const backgroundInput = document.querySelector(
      `input[name="background"][value="${normalizeBackground(item.background)}"]`,
    );
    if (backgroundInput) backgroundInput.checked = true;
    if (item.jjal && item.moodKey) {
      const mood = jjalMoods[item.moodKey] || jjalMoods.clutch;
      applyJjal(
        item.moodKey,
        nextDeckPhrase("jjal:" + item.moodKey, mood.phrases, item.phrase),
      );
    } else {
      scenarioSelect.value = item.scenario || "bottom9";
      toneSelect.value = item.tone || "hype";
      cardFormatSelect.value = normalizeCardFormat(item.format);
      energyInput.value = String(item.energy || 4);
      nicknameInput.value = item.nickname || "";
      const ratioInput = document.querySelector(`input[name="ratio"][value="${item.ratio || "square"}"]`);
      if (ratioInput) ratioInput.checked = true;
      generateCard();
    }
    saveCurrentCard();
    scrollShareCardIntoView();
    showToast("같은 톤으로 새 카드가 만들어졌습니다.");
  }
  if (action === "copy") {
    copyHistoryItem(item).catch(() => showToast("복사하지 못했습니다. 다시 시도해주세요."));
  }
  if (action === "delete") {
    const current = readHistory();
    pendingHistoryUndo = {
      item,
      index: current.findIndex((entry) => entry.id === item.id),
    };
    writeHistory(current.filter((entry) => entry.id !== item.id));
    renderCardHistory();
    showToast("보관함에서 삭제했습니다.", {
      label: "되돌리기",
      handler: restoreDeletedHistoryItem,
    });
  }
});

clearHistoryBtn.addEventListener("click", () => {
  writeHistory([]);
  historyExpanded = false;
  renderCardHistory();
  showToast("보관함을 비웠습니다.");
});

timelineBtn.addEventListener("click", buildEmotionTimeline);

weeklyRecapBtn.addEventListener("click", buildWeeklyRecap);

challengeRecapBtn.addEventListener("click", buildWeeklyRecap);

historyToggleBtn.addEventListener("click", () => {
  historyExpanded = !historyExpanded;
  renderCardHistory();
});

document.querySelectorAll(".pulse-vote").forEach((button) => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    jjalMoodSelect.value = mood;
    if (activeRelayQuestion) {
      applyRelayAnswer(mood);
    } else {
      recordReaction(mood, 4);
      showToast(`${jjalMoods[mood].label} 반응을 더했습니다.`);
    }
  });
});

pulseToggleBtn.addEventListener("click", () => {
  pulseExpanded = !pulseExpanded;
  renderReactionPulse();
});

copyReportBtn.addEventListener("click", () => {
  copyReportText().catch(() => {
    showToast("검토 문구를 복사하지 못했습니다.");
  });
});

copyFeedbackBtn.addEventListener("click", () => {
  copyFeedbackText().catch(() => {
    showToast("피드백 문구를 복사하지 못했습니다.");
  });
});

copyBetaReportBtn.addEventListener("click", () => {
  copyBetaReportText().catch(() => {
    showToast("베타 리포트를 복사하지 못했습니다.");
  });
});

inviteToneSelect.addEventListener("change", renderInvitePreview);

copyInviteBtn.addEventListener("click", () => {
  copyInviteText().catch(() => {
    showToast("초대 문구를 복사하지 못했습니다.");
  });
});

copyLaunchChecklistBtn.addEventListener("click", () => {
  copyLaunchChecklist().catch(() => {
    showToast("체크리스트를 복사하지 못했습니다.");
  });
});

clearLocalDataBtn.addEventListener("click", () => {
  if (clearLocalDataArmed) {
    clearLocalData();
    return;
  }
  clearLocalDataArmed = true;
  clearLocalDataBtn.classList.add("is-confirming");
  clearLocalDataBtn.textContent = "한 번 더 누르면 삭제";
  showToast("한 번 더 누르면 이 브라우저의 저장 데이터가 지워집니다.");
  window.clearTimeout(clearLocalDataBtn.timer);
  clearLocalDataBtn.timer = window.setTimeout(resetClearLocalDataButton, 4200);
});

energyInput.addEventListener("input", () => {
  energyLabel.textContent = energyInput.value;
});

document.querySelectorAll('input[name="ratio"]').forEach((input) => {
  input.addEventListener("change", generateCard);
});

backgroundInputs.forEach((input) => {
  input.addEventListener("change", () => {
    currentState.background = getSelectedBackground();
    renderShareCard();
  });
});

scenarioSelect.addEventListener("change", generateCard);
toneSelect.addEventListener("change", generateCard);
cardFormatSelect.addEventListener("change", generateCard);
nicknameInput.addEventListener("change", generateCard);

renderLineup();
renderQuickJjals();
renderContentInventory();
reactionVotes = readReactionVotes();
renderReactionPulse();
renderDailyDeck();
renderInvitePreview();
selectMission(readAttendance().mission);
updateAttendanceStatus();
setupInstallFlow();
registerServiceWorker();
const restoredCard = restoreCardFromHash();
if (!restoredCard) {
  const restoredRelay = restoreRelayFromHash();
  generateCard();
  if (restoredRelay) {
    scrollReactionPulseIntoView();
  }
}
renderCardHistory();
setupAppTabs();

window.addEventListener("hashchange", () => {
  if (!restoreCardFromHash()) {
    restoreRelayFromHash();
  }
});
