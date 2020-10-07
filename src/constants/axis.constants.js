const AXIS = {
  UD_AXIS: "UD_AXIS",
  RL_AXIS: "RL_AXIS",
  FB_AXIS: "FB_AXIS",
};

export default AXIS;

/*
UD_AXIS, RL_AXIS, FB_AXIS;

	private static List<AxisEnum> OTHERS_UD = Arrays.asList(RL_AXIS, FB_AXIS);
	private static List<AxisEnum> OTHERS_RL = Arrays.asList(UD_AXIS, FB_AXIS);
	private static List<AxisEnum> OTHERS_FB = Arrays.asList(UD_AXIS, RL_AXIS);

	public List<AxisEnum> getOtherAxis() {
		switch (this) {
		case UD_AXIS:
			return OTHERS_UD;
		case RL_AXIS:
			return OTHERS_RL;
		default: // FB_AXIS
			return OTHERS_FB;
		}
	}

	// If this is UD and axis is RL, return FB
	public AxisEnum getOtherAxis(AxisEnum axis) {
		for (AxisEnum e : AxisEnum.values()) {
			if (e != this && e != axis) {
				return e;
			}
		}
		return null;
	}

	public AxisEnum getNextAxis() {
		int i = 0;
		for (AxisEnum axis : AxisEnum.values()) {
			if (this == axis) {
				return AxisEnum.values()[(i + 1) % AxisEnum.values().length];
			}
			i++;
		}
		return null;
	}
}

*/
